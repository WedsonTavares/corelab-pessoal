'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, CheckCircle2 } from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import axios from 'axios';

export default function FavoritesPage() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch favorite tasks
  const fetchFavoriteTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/tasks?filter=favorites');
      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching favorite tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter tasks by search term
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    fetchFavoriteTasks();
  }, []);

  // Update task
  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, taskData);
      if (response.data.success) {
        await fetchFavoriteTasks(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(`/api/tasks/${id}`);
      if (response.data.success) {
        await fetchFavoriteTasks(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-500/20 rounded-lg">
          <Heart size={24} className="text-red-500 fill-current" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Tarefas Favoritas</h1>
          <p className="text-gray-400">Suas tarefas mais importantes</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Buscar nas favoritas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#1e1e1e] border border-[#2f2f2f] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Tasks Grid */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Carregando tarefas favoritas...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-[#2f2f2f] rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {tasks.length === 0
                ? 'Nenhuma tarefa favorita'
                : 'Nenhuma tarefa encontrada'}
            </h3>
            <p className="text-gray-400 mb-4">
              {tasks.length === 0
                ? 'Marque suas tarefas importantes como favoritas para vê-las aqui'
                : 'Tente ajustar o termo de busca'}
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400 flex items-center gap-2">
                <Heart size={16} className="fill-current" />
                Mostrando {filteredTasks.length} de {tasks.length} tarefas
                favoritas
              </p>
            </div>
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

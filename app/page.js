'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Star,
  BarChart3,
  Calendar,
  Target,
} from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import AddTaskForm from '@/components/AddTaskForm';
import TaskFilters from '@/components/TaskFilters';
import DashboardTasksOverview from '@/components/DashboardTasksOverview';
import axios from 'axios';

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    showFavorites: false,
    color: 'all',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showCharts, setShowCharts] = useState(false); // Gráficos ocultos por padrão, aparecem como modal
  const [taskCounts, setTaskCounts] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    favorites: 0,
  });

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/tasks');
      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and search tasks
  useEffect(() => {
    let filtered = [...tasks];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (task.description &&
            task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Favorites filter
    if (filters.showFavorites) {
      filtered = filtered.filter((task) => task.isFavorite);
    }

    // Color filter
    if (filters.color && filters.color !== 'all') {
      filtered = filtered.filter((task) => task.color === filters.color);
    }

    // Sort: favorites first, then by creation date
    filtered.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, filters]);

  // Update task counts
  useEffect(() => {
    setTaskCounts({
      total: tasks.length,
      pending: tasks.filter((task) => !task.completed).length,
      completed: tasks.filter((task) => task.completed).length,
      favorites: tasks.filter((task) => task.isFavorite).length,
    });
  }, [tasks]);

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post('/api/tasks', taskData);
      if (response.data.success) {
        await fetchTasks(); // Refresh the list
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Update task
  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, taskData);
      if (response.data.success) {
        await fetchTasks(); // Refresh the list
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
        await fetchTasks(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Target size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gerenciador de Tarefas
            </h1>
            <p className="text-gray-400">
              Organize suas tarefas de forma eficiente com insights visuais
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCharts(!showCharts)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showCharts
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <BarChart3 size={20} />
            {showCharts ? 'Fechar Gráficos' : 'Ver Gráficos'}
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Nova Tarefa
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-blue-500/20 rounded-lg">
              <CheckCircle2 size={16} className="text-blue-400" />
            </div>
            <p className="text-xl font-bold text-blue-400">{taskCounts.total}</p>
            <p className="text-xs text-gray-300">Total</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-3 bg-gradient-to-br from-yellow-500/10 to-orange-600/10 rounded-lg border border-yellow-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-yellow-500/20 rounded-lg">
              <Clock size={16} className="text-yellow-400" />
            </div>
            <p className="text-xl font-bold text-yellow-400">{taskCounts.pending}</p>
            <p className="text-xs text-gray-300">Pendentes</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-3 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-lg border border-green-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-green-500/20 rounded-lg">
              <CheckCircle2 size={16} className="text-green-400" />
            </div>
            <p className="text-xl font-bold text-green-400">{taskCounts.completed}</p>
            <p className="text-xs text-gray-300">Concluídas</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-3 bg-gradient-to-br from-pink-500/10 to-red-600/10 rounded-lg border border-pink-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-pink-500/20 rounded-lg">
              <Star size={16} className="text-pink-400" />
            </div>
            <p className="text-xl font-bold text-pink-400">{taskCounts.favorites}</p>
            <p className="text-xs text-gray-300">Favoritas</p>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters - Single Row */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-[#1e1e1e] rounded-lg border border-[#2f2f2f]">
        {/* Search Bar */}
        <div className="relative lg:flex-1 lg:max-w-md">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar tarefas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#2f2f2f] border border-[#404040] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
          />
        </div>

        {/* Filters in the same row */}
        <div className="flex-1">
          <TaskFilters
            filters={filters}
            onFiltersChange={setFilters}
            taskCounts={taskCounts}
            compact={true}
            inline={true}
          />
        </div>
      </div>

      {/* Charts Modal/Overlay */}
      <AnimatePresence>
        {showCharts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCharts(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-[#121212] rounded-xl border border-[#2f2f2f] shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#2f2f2f] sticky top-0 bg-[#121212] z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    <BarChart3 size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Analytics Dashboard
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Análise visual das suas tarefas
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCharts(false)}
                  className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <DashboardTasksOverview tasks={tasks} />
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-[#2f2f2f] bg-[#1a1a1a] rounded-b-xl">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    Dados atualizados em tempo real • {tasks.length} tarefas
                    analisadas
                  </p>
                  <button
                    onClick={() => setShowCharts(false)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors text-sm"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar size={20} className="text-blue-400" />
            Tarefas Recentes
          </h2>
          <span className="text-sm text-gray-400">
            {filteredTasks.length > 5
              ? 'Mostrando últimas 5 tarefas'
              : `${filteredTasks.length} tarefa(s)`}
          </span>
        </div>

        {/* Tasks Grid */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Carregando tarefas...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-[#2f2f2f] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-gray-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {tasks.length === 0
                  ? 'Nenhuma tarefa criada'
                  : 'Nenhuma tarefa encontrada'}
              </h3>
              <p className="text-gray-400 mb-4">
                {tasks.length === 0
                  ? 'Crie sua primeira tarefa para começar a organizar seu dia'
                  : 'Tente ajustar os filtros ou criar uma nova tarefa'}
              </p>
              {tasks.length === 0 && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Plus size={20} />
                  Criar primeira tarefa
                </button>
              )}
            </motion.div>
          ) : (
            <div className="grid gap-4">
              <AnimatePresence>
                {filteredTasks.slice(0, 5).map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onUpdate={handleUpdateTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </AnimatePresence>
              {filteredTasks.length > 5 && (
                <div className="text-center pt-4">
                  <p className="text-gray-400 text-sm mb-3">
                    Há {filteredTasks.length - 5} tarefa(s) adicional(is)
                  </p>
                  <a
                    href="/tasks"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                  >
                    Ver todas as tarefas
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Task Form */}
      <AnimatePresence>
        {showAddForm && (
          <AddTaskForm
            onAddTask={handleAddTask}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

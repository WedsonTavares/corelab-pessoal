'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Edit2, Trash2, Check, X, Save } from 'lucide-react';

const COLORS = [
  { name: 'Azul', value: '#6366f1' },
  { name: 'Rosa', value: '#ec4899' },
  { name: 'Verde', value: '#10b981' },
  { name: 'Amarelo', value: '#f59e0b' },
  { name: 'Vermelho', value: '#ef4444' },
  { name: 'Roxo', value: '#8b5cf6' },
  { name: 'Ciano', value: '#06b6d4' },
  { name: 'Lima', value: '#84cc16' },
];

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(
    task.description || ''
  );
  const [editColor, setEditColor] = useState(task.color);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFavorite = async () => {
    setIsLoading(true);
    try {
      await onUpdate(task._id, { ...task, isFavorite: !task.isFavorite });
    } catch (error) {
      console.error('Error updating favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      await onUpdate(task._id, { ...task, completed: !task.completed });
    } catch (error) {
      console.error('Error updating completion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;

    setIsLoading(true);
    try {
      await onUpdate(task._id, {
        ...task,
        title: editTitle.trim(),
        description: editDescription.trim(),
        color: editColor,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditColor(task.color);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setIsLoading(true);
      try {
        await onDelete(task._id);
      } catch (error) {
        console.error('Error deleting task:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`relative p-3 rounded-lg border border-[#2f2f2f] transition-all duration-200 hover:border-[#404040] ${
        task.completed ? 'opacity-60' : ''
      }`}
      style={{ backgroundColor: `${task.color}15` }}
    >
      {/* Color indicator */}
      <div
        className="absolute top-0 left-0 w-1 h-full rounded-l-lg"
        style={{ backgroundColor: task.color }}
      />

      {/* Favorite indicator */}
      {task.isFavorite && (
        <div className="absolute top-2 right-2">
          <Heart size={14} className="text-red-500 fill-current" />
        </div>
      )}

      <div className="ml-3">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-2 bg-[#2f2f2f] border border-[#404040] rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              maxLength={100}
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full p-2 bg-[#2f2f2f] border border-[#404040] rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none resize-none"
              rows={2}
              placeholder="Descrição..."
              maxLength={500}
            />
            <div className="flex gap-1 flex-wrap">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setEditColor(color.value)}
                  className={`w-6 h-6 rounded border-2 transition-all ${
                    editColor === color.value
                      ? 'border-white scale-110'
                      : 'border-transparent hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3
              className={`font-medium text-sm mb-1 ${task.completed ? 'line-through' : ''}`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-xs text-gray-400 mb-2 line-clamp-2 ${task.completed ? 'line-through' : ''}`}
              >
                {task.description}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleComplete}
              disabled={isLoading}
              className={`p-1 rounded-full transition-colors ${
                task.completed
                  ? 'bg-green-600 text-white'
                  : 'bg-[#2f2f2f] hover:bg-[#404040]'
              }`}
            >
              <Check size={14} />
            </button>
            <span className="text-xs text-gray-500">
              {task.completed ? 'Concluída' : 'Pendente'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  disabled={!editTitle.trim() || isLoading}
                  className="p-1 hover:bg-[#2f2f2f] rounded transition-colors disabled:opacity-50"
                >
                  <Save size={12} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-1 hover:bg-[#2f2f2f] rounded transition-colors"
                >
                  <X size={12} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleToggleFavorite}
                  disabled={isLoading}
                  className={`p-1 rounded transition-colors ${
                    task.isFavorite
                      ? 'text-red-500 hover:bg-red-500/10'
                      : 'hover:bg-[#2f2f2f] hover:text-red-500'
                  }`}
                >
                  <Heart
                    size={12}
                    className={task.isFavorite ? 'fill-current' : ''}
                  />
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 hover:bg-[#2f2f2f] rounded transition-colors"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="p-1 hover:bg-red-500/20 hover:text-red-500 rounded transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </motion.div>
  );
}

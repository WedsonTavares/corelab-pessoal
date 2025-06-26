'use client';

import { motion } from 'framer-motion';
import { Settings, User, Bell, Palette, Database, Info } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gray-500/20 rounded-lg">
          <Settings size={24} className="text-gray-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-gray-400">Personalize sua experiência</p>
        </div>
      </div>

      {/* Settings Cards */}
      <div className="grid gap-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-[#1e1e1e] rounded-lg border border-[#2f2f2f]"
        >
          <div className="flex items-center gap-3 mb-4">
            <User size={20} className="text-blue-500" />
            <h2 className="text-lg font-semibold">Perfil</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome</label>
              <input
                type="text"
                defaultValue="Usuário"
                className="w-full p-3 bg-[#2f2f2f] border border-[#404040] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                defaultValue="usuario@example.com"
                className="w-full p-3 bg-[#2f2f2f] border border-[#404040] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-[#1e1e1e] rounded-lg border border-[#2f2f2f]"
        >
          <div className="flex items-center gap-3 mb-4">
            <Bell size={20} className="text-yellow-500" />
            <h2 className="text-lg font-semibold">Notificações</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Notificações de tarefas</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span>Lembrete de tarefas pendentes</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span>Notificações por email</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </motion.div>

        {/* Theme Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-[#1e1e1e] rounded-lg border border-[#2f2f2f]"
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette size={20} className="text-purple-500" />
            <h2 className="text-lg font-semibold">Aparência</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tema</label>
              <select className="w-full p-3 bg-[#2f2f2f] border border-[#404040] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                <option value="dark">Escuro</option>
                <option value="light">Claro</option>
                <option value="auto">Automático</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Cor de destaque
              </label>
              <div className="flex gap-2">
                {[
                  '#6366f1',
                  '#ec4899',
                  '#10b981',
                  '#f59e0b',
                  '#ef4444',
                  '#8b5cf6',
                ].map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-[#1e1e1e] rounded-lg border border-[#2f2f2f]"
        >
          <div className="flex items-center gap-3 mb-4">
            <Database size={20} className="text-green-500" />
            <h2 className="text-lg font-semibold">Dados</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Exportar tarefas
            </button>
            <button className="w-full p-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors">
              Importar tarefas
            </button>
            <button className="w-full p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              Limpar todas as tarefas
            </button>
          </div>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-[#1e1e1e] rounded-lg border border-[#2f2f2f]"
        >
          <div className="flex items-center gap-3 mb-4">
            <Info size={20} className="text-cyan-500" />
            <h2 className="text-lg font-semibold">Sobre</h2>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p>
              <strong>Versão:</strong> 1.0.0
            </p>
            <p>
              <strong>Desenvolvido para:</strong> Corelab Challenge
            </p>
            <p>
              <strong>Framework:</strong> Next.js 15.3.3
            </p>
            <p>
              <strong>Database:</strong> MongoDB
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

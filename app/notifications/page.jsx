'use client';

import { motion } from 'framer-motion';
import { Bell, Settings, Clock, Filter } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-500/20 rounded-lg">
          <Bell size={24} className="text-yellow-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Notificações</h1>
          <p className="text-gray-400">Mantenha-se atualizado</p>
        </div>
      </div>

      {/* Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Bell size={40} className="text-yellow-500" />
        </div>
        <h2 className="text-xl font-semibold mb-4">Em Desenvolvimento</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          O sistema de notificações estará disponível em breve. Você receberá
          alertas sobre prazos, atualizações de tarefas e muito mais.
        </p>
        <div className="flex justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>Lembretes de prazo</span>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} />
            <span>Filtrar por tipo</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings size={16} />
            <span>Configurar alertas</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

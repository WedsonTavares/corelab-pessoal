'use client';

import { motion } from 'framer-motion';
import { Mail, Send, Archive, Trash2 } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Mail size={24} className="text-blue-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Mensagens</h1>
          <p className="text-gray-400">Comunicação e colaboração</p>
        </div>
      </div>

      {/* Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail size={40} className="text-blue-500" />
        </div>
        <h2 className="text-xl font-semibold mb-4">Em Desenvolvimento</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          O sistema de mensagens estará disponível em breve. Você poderá
          colaborar com sua equipe e receber notificações importantes.
        </p>
        <div className="flex justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Send size={16} />
            <span>Enviar mensagens</span>
          </div>
          <div className="flex items-center gap-2">
            <Archive size={16} />
            <span>Organizar conversas</span>
          </div>
          <div className="flex items-center gap-2">
            <Trash2 size={16} />
            <span>Gerenciar histórico</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

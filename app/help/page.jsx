'use client';

import { motion } from 'framer-motion';
import {
  HelpCircle,
  Book,
  MessageCircle,
  Video,
  ExternalLink,
} from 'lucide-react';

export default function HelpPage() {
  const helpTopics = [
    {
      title: 'Como criar uma tarefa',
      description: 'Aprenda a criar e organizar suas tarefas',
      icon: Book,
      color: 'blue',
    },
    {
      title: 'Utilizando filtros',
      description: 'Encontre suas tarefas rapidamente',
      icon: MessageCircle,
      color: 'green',
    },
    {
      title: 'Gerenciando favoritas',
      description: 'Marque tarefas importantes como favoritas',
      icon: Video,
      color: 'purple',
    },
    {
      title: 'Configurações avançadas',
      description: 'Personalize sua experiência',
      icon: ExternalLink,
      color: 'orange',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <HelpCircle size={24} className="text-indigo-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Central de Ajuda</h1>
          <p className="text-gray-400">
            Encontre respostas e aprenda sobre o sistema
          </p>
        </div>
      </div>

      {/* Quick Help */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-500/20"
      >
        <h2 className="text-lg font-semibold mb-4">🚀 Começando</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">1. Criar sua primeira tarefa</h3>
            <p className="text-sm text-gray-400">
              Clique no botão "Nova Tarefa" para começar
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">2. Organizar por cores</h3>
            <p className="text-sm text-gray-400">
              Use cores para categorizar suas tarefas
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">3. Marcar como favorita</h3>
            <p className="text-sm text-gray-400">
              Use o ❤️ para priorizar tarefas importantes
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2">4. Filtrar e buscar</h3>
            <p className="text-sm text-gray-400">
              Use filtros para encontrar rapidamente
            </p>
          </div>
        </div>
      </motion.div>

      {/* Help Topics */}
      <div className="grid md:grid-cols-2 gap-4">
        {helpTopics.map((topic, index) => {
          const Icon = topic.icon;
          const colorClasses = {
            blue: 'bg-blue-500/20 text-blue-500',
            green: 'bg-green-500/20 text-green-500',
            purple: 'bg-purple-500/20 text-purple-500',
            orange: 'bg-orange-500/20 text-orange-500',
          };

          return (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] hover:border-[#404040] transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${colorClasses[topic.color]}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{topic.title}</h3>
                  <p className="text-sm text-gray-400">{topic.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] text-center"
      >
        <h2 className="text-lg font-semibold mb-4">Precisa de mais ajuda?</h2>
        <p className="text-gray-400 mb-6">
          Não encontrou o que procurava? Entre em contato conosco para suporte
          personalizado.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            Contatar Suporte
          </button>
          <button className="px-6 py-2 bg-[#2f2f2f] hover:bg-[#404040] rounded-lg transition-colors">
            FAQ
          </button>
        </div>
      </motion.div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-4 bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] text-sm"
      >
        <h3 className="font-medium mb-2">Informações do Sistema</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-400">
          <div>
            <span className="block font-medium text-white">Versão</span>
            <span>1.0.0</span>
          </div>
          <div>
            <span className="block font-medium text-white">Framework</span>
            <span>Next.js 15</span>
          </div>
          <div>
            <span className="block font-medium text-white">Database</span>
            <span>MongoDB</span>
          </div>
          <div>
            <span className="block font-medium text-white">Status</span>
            <span className="text-green-400">Online</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

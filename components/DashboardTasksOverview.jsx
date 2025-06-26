'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

export default function DashboardTasksOverview({ tasks }) {
  const statusData = [
    {
      name: 'Pendentes',
      value: tasks.filter((task) => !task.completed).length,
      color: '#f59e0b',
    },
    {
      name: 'Concluídas',
      value: tasks.filter((task) => task.completed).length,
      color: '#10b981',
    },
  ];

  const favoriteData = [
    {
      name: 'Favoritas',
      value: tasks.filter((task) => task.isFavorite).length,
      color: '#ec4899',
    },
    {
      name: 'Normais',
      value: tasks.filter((task) => !task.isFavorite).length,
      color: '#6b7280',
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-[#1e1e1e] border border-[#2f2f2f] rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-sm text-gray-400">Quantidade: {data.value}</p>
          <p className="text-sm text-gray-400">
            Porcentagem: {((data.value / tasks.length) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] p-6">
        <h3 className="text-lg font-semibold mb-4">Visão Geral das Tarefas</h3>
        <div className="text-center py-8 text-gray-400">
          <p>Nenhuma tarefa encontrada</p>
          <p className="text-sm mt-2">
            Crie sua primeira tarefa para ver os gráficos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] p-6">
      <h3 className="text-lg font-semibold mb-4">Visão Geral das Tarefas</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">
            Status das Tarefas
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span className="text-xs text-gray-400">Pendentes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-400">Concluídas</span>
            </div>
          </div>
        </div>

        {/* Favorites Chart */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3">
            Distribuição por Prioridade
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={favoriteData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {favoriteData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-pink-500 rounded"></div>
              <span className="text-xs text-gray-400">Favoritas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded"></div>
              <span className="text-xs text-gray-400">Normais</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#2f2f2f]">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-400">{tasks.length}</p>
          <p className="text-xs text-gray-400">Total</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-400">
            {tasks.filter((task) => !task.completed).length}
          </p>
          <p className="text-xs text-gray-400">Pendentes</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-400">
            {tasks.filter((task) => task.completed).length}
          </p>
          <p className="text-xs text-gray-400">Concluídas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-pink-400">
            {tasks.filter((task) => task.isFavorite).length}
          </p>
          <p className="text-xs text-gray-400">Favoritas</p>
        </div>
      </div>
    </div>
  );
}

'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function TaskCompletionChart({ tasks }) {
  // Agrupar tarefas por status
  const statusData = [
    {
      name: 'Pendentes',
      value: tasks.filter((task) => !task.completed).length,
      fill: '#f59e0b',
    },
    {
      name: 'Concluídas',
      value: tasks.filter((task) => task.completed).length,
      fill: '#10b981',
    },
  ];

  // Dados por favoritas
  const favoriteData = [
    {
      name: 'Favoritas',
      pendentes: tasks.filter((task) => task.isFavorite && !task.completed)
        .length,
      concluidas: tasks.filter((task) => task.isFavorite && task.completed)
        .length,
    },
    {
      name: 'Normais',
      pendentes: tasks.filter((task) => !task.isFavorite && !task.completed)
        .length,
      concluidas: tasks.filter((task) => !task.isFavorite && task.completed)
        .length,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1e1e] border border-[#2f2f2f] rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'pendentes' ? 'Pendentes' : 'Concluídas'}:{' '}
              {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] p-6">
        <h3 className="text-lg font-semibold mb-4">Status das Tarefas</h3>
        <div className="text-center py-8 text-gray-400">
          <p>Nenhuma tarefa encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] p-6">
      <h3 className="text-lg font-semibold mb-4">Status das Tarefas</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={favoriteData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2f2f2f" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#2f2f2f' }}
            />
            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#2f2f2f' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="pendentes" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="concluidas" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-400">Pendentes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-400">Concluídas</span>
        </div>
      </div>
    </div>
  );
}

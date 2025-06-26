'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function TaskTrendChart({ tasks }) {
  // Agrupar tarefas por data de criação (últimos 7 dias)
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
        }),
      });
    }
    return days;
  };

  const last7Days = getLast7Days();

  const trendData = last7Days.map((day) => {
    const dayTasks = tasks.filter((task) => {
      const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
      return taskDate === day.date;
    });

    const completedTasks = tasks.filter((task) => {
      const completedDate = new Date(task.updatedAt)
        .toISOString()
        .split('T')[0];
      return completedDate === day.date && task.completed;
    });

    return {
      date: day.label,
      criadas: dayTasks.length,
      concluidas: completedTasks.length,
      favoritas: dayTasks.filter((task) => task.isFavorite).length,
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1e1e] border border-[#2f2f2f] rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'criadas' && 'Criadas: '}
              {entry.dataKey === 'concluidas' && 'Concluídas: '}
              {entry.dataKey === 'favoritas' && 'Favoritas: '}
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
        <h3 className="text-lg font-semibold mb-4">
          Tendência (Últimos 7 dias)
        </h3>
        <div className="text-center py-8 text-gray-400">
          <p>Nenhuma tarefa encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] p-6">
      <h3 className="text-lg font-semibold mb-4">Tendência (Últimos 7 dias)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2f2f2f" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#2f2f2f' }}
            />
            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#2f2f2f' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="criadas"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="concluidas"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="favoritas"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#ec4899', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-400">Criadas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-400">Concluídas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-pink-500 rounded"></div>
          <span className="text-sm text-gray-400">Favoritas</span>
        </div>
      </div>
    </div>
  );
}

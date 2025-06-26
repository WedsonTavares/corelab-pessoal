'use client';

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const COLORS = {
  '#6366f1': '#6366f1',
  '#ec4899': '#ec4899',
  '#10b981': '#10b981',
  '#f59e0b': '#f59e0b',
  '#ef4444': '#ef4444',
  '#8b5cf6': '#8b5cf6',
  '#06b6d4': '#06b6d4',
  '#84cc16': '#84cc16',
};

const COLOR_NAMES = {
  '#6366f1': 'Azul',
  '#ec4899': 'Rosa',
  '#10b981': 'Verde',
  '#f59e0b': 'Amarelo',
  '#ef4444': 'Vermelho',
  '#8b5cf6': 'Roxo',
  '#06b6d4': 'Ciano',
  '#84cc16': 'Lima',
};

export default function TasksByColorChart({ tasks }) {
  // Agrupar tarefas por cor
  const colorData = Object.keys(COLORS)
    .map((color) => {
      const tasksWithColor = tasks.filter((task) => task.color === color);
      return {
        color,
        name: COLOR_NAMES[color],
        value: tasksWithColor.length,
        completed: tasksWithColor.filter((task) => task.completed).length,
        pending: tasksWithColor.filter((task) => !task.completed).length,
      };
    })
    .filter((item) => item.value > 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1e1e1e] border border-[#2f2f2f] rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-sm text-gray-400">Total: {data.value}</p>
          <p className="text-sm text-green-400">Concluídas: {data.completed}</p>
          <p className="text-sm text-yellow-400">Pendentes: {data.pending}</p>
        </div>
      );
    }
    return null;
  };

  if (colorData.length === 0) {
    return (
      <div className="bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] p-6">
        <h3 className="text-lg font-semibold mb-4">Tarefas por Cor</h3>
        <div className="text-center py-8 text-gray-400">
          <p>Nenhuma tarefa encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] p-6">
      <h3 className="text-lg font-semibold mb-4">Tarefas por Cor</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={colorData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {colorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value, entry) => (
                <span style={{ color: '#fff' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

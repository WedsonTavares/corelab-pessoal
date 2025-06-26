'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function TaskProductivityChart({ tasks }) {
  // Calcular produtividade por dia da semana
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const productivityData = daysOfWeek.map((dayName, index) => {
    const dayTasks = tasks.filter((task) => {
      const taskDay = new Date(task.createdAt).getDay();
      return taskDay === index;
    });

    const completedTasks = tasks.filter((task) => {
      const completedDay = new Date(task.updatedAt).getDay();
      return completedDay === index && task.completed;
    });

    const productivity =
      dayTasks.length > 0
        ? Math.round((completedTasks.length / dayTasks.length) * 100)
        : 0;

    return {
      day: dayName,
      tarefas: dayTasks.length,
      concluidas: completedTasks.length,
      produtividade: productivity,
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1e1e1e] border border-[#2f2f2f] rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{label}</p>
          <p className="text-sm text-blue-400">Tarefas: {data.tarefas}</p>
          <p className="text-sm text-green-400">
            Concluídas: {data.concluidas}
          </p>
          <p className="text-sm text-purple-400">
            Produtividade: {data.produtividade}%
          </p>
        </div>
      );
    }
    return null;
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] p-6">
        <h3 className="text-lg font-semibold mb-4">Produtividade por Dia</h3>
        <div className="text-center py-8 text-gray-400">
          <p>Nenhuma tarefa encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] rounded-lg border border-[#2f2f2f] p-6">
      <h3 className="text-lg font-semibold mb-4">
        Produtividade por Dia da Semana
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={productivityData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient
                id="productivityGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2f2f2f" />
            <XAxis
              dataKey="day"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#2f2f2f' }}
            />
            <YAxis
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#2f2f2f' }}
              domain={[0, 100]}
              label={{
                value: '%',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#9ca3af' },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="produtividade"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#productivityGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span className="text-sm text-gray-400">Taxa de Conclusão (%)</span>
        </div>
      </div>
    </div>
  );
}

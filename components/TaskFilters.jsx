'use client';

import { useState } from 'react';
import { Filter, Heart, Palette } from 'lucide-react';

const COLORS = [
  { name: 'Todas', value: 'all' },
  { name: 'Azul', value: '#6366f1' },
  { name: 'Rosa', value: '#ec4899' },
  { name: 'Verde', value: '#10b981' },
  { name: 'Amarelo', value: '#f59e0b' },
  { name: 'Vermelho', value: '#ef4444' },
  { name: 'Roxo', value: '#8b5cf6' },
  { name: 'Ciano', value: '#06b6d4' },
  { name: 'Lima', value: '#84cc16' },
];

export default function TaskFilters({
  filters,
  onFiltersChange,
  taskCounts,
  compact = false,
  inline = false,
}) {
  const [showColorFilter, setShowColorFilter] = useState(false);

  const handleFilterChange = (type, value) => {
    onFiltersChange({ ...filters, [type]: value });
  };

  if (compact && inline) {
    return (
      <div className="flex flex-wrap items-center justify-between w-full gap-2">
        {/* Left side - Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Filter size={14} />
            <span>Filtros:</span>
          </div>

          {/* Favorites filter */}
          <button
            onClick={() =>
              handleFilterChange('showFavorites', !filters.showFavorites)
            }
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
              filters.showFavorites
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-[#404040] hover:bg-[#505050] border border-transparent'
            }`}
          >
            <Heart
              size={10}
              className={filters.showFavorites ? 'fill-current' : ''}
            />
            Favoritas
            {taskCounts.favorites > 0 && (
              <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded-full min-w-[14px] text-center leading-none">
                {taskCounts.favorites}
              </span>
            )}
          </button>

          {/* Color filter */}
          <div className="relative">
            <button
              onClick={() => setShowColorFilter(!showColorFilter)}
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors ${
                filters.color !== 'all'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-[#404040] hover:bg-[#505050] border border-transparent'
              }`}
            >
              <Palette size={10} />
              {filters.color === 'all' ? 'Cores' : 'Cor'}
              {filters.color !== 'all' && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: filters.color }}
                />
              )}
            </button>

            {showColorFilter && (
              <div className="absolute top-full left-0 mt-2 p-2 bg-[#1e1e1e] border border-[#2f2f2f] rounded-lg shadow-lg z-10 min-w-[160px]">
                <div className="grid grid-cols-3 gap-1">
                  {COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        handleFilterChange('color', color.value);
                        setShowColorFilter(false);
                      }}
                      className={`flex items-center gap-1 p-1 rounded text-xs transition-colors ${
                        filters.color === color.value
                          ? 'bg-[#404040]'
                          : 'hover:bg-[#2f2f2f]'
                      }`}
                    >
                      {color.value !== 'all' ? (
                        <div
                          className="w-2.5 h-2.5 rounded-full border border-[#404040]"
                          style={{ backgroundColor: color.value }}
                        />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full border border-[#404040] bg-gradient-to-r from-red-500 via-blue-500 to-green-500" />
                      )}
                      <span className="truncate text-xs">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Compact Status info */}
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
            {taskCounts.total}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
            {taskCounts.pending}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
            {taskCounts.completed}
          </span>
        </div>

        {/* Click outside to close color filter */}
        {showColorFilter && (
          <div
            className="fixed inset-0 z-5"
            onClick={() => setShowColorFilter(false)}
          />
        )}
      </div>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-between w-full gap-3">
        {/* Left side - Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Filter size={16} />
            <span>Filtros:</span>
          </div>

          {/* Favorites filter */}
          <button
            onClick={() =>
              handleFilterChange('showFavorites', !filters.showFavorites)
            }
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors ${
              filters.showFavorites
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-[#2f2f2f] hover:bg-[#404040] border border-transparent'
            }`}
          >
            <Heart
              size={12}
              className={filters.showFavorites ? 'fill-current' : ''}
            />
            Favoritas
            {taskCounts.favorites > 0 && (
              <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded-full min-w-[16px] text-center">
                {taskCounts.favorites}
              </span>
            )}
          </button>

          {/* Color filter */}
          <div className="relative">
            <button
              onClick={() => setShowColorFilter(!showColorFilter)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors ${
                filters.color !== 'all'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-[#2f2f2f] hover:bg-[#404040] border border-transparent'
              }`}
            >
              <Palette size={12} />
              {filters.color === 'all' ? 'Todas as cores' : 'Cor filtrada'}
              {filters.color !== 'all' && (
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: filters.color }}
                />
              )}
            </button>

            {showColorFilter && (
              <div className="absolute top-full left-0 mt-2 p-2 bg-[#1e1e1e] border border-[#2f2f2f] rounded-lg shadow-lg z-10 min-w-[180px]">
                <div className="grid grid-cols-3 gap-1">
                  {COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        handleFilterChange('color', color.value);
                        setShowColorFilter(false);
                      }}
                      className={`flex items-center gap-1.5 p-1.5 rounded text-xs transition-colors ${
                        filters.color === color.value
                          ? 'bg-[#404040]'
                          : 'hover:bg-[#2f2f2f]'
                      }`}
                    >
                      {color.value !== 'all' ? (
                        <div
                          className="w-3 h-3 rounded-full border border-[#404040]"
                          style={{ backgroundColor: color.value }}
                        />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-[#404040] bg-gradient-to-r from-red-500 via-blue-500 to-green-500" />
                      )}
                      <span className="truncate">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Compact Status info */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            Total: {taskCounts.total}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            Pendentes: {taskCounts.pending}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Concluídas: {taskCounts.completed}
          </span>
        </div>

        {/* Click outside to close color filter */}
        {showColorFilter && (
          <div
            className="fixed inset-0 z-5"
            onClick={() => setShowColorFilter(false)}
          />
        )}
      </div>
    );
  }

  // Versão original para a página de tarefas
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-[#1e1e1e] rounded-lg border border-[#2f2f2f]">
      <div className="flex items-center gap-2">
        <Filter size={18} />
        <span className="text-sm font-medium">Filtros:</span>
      </div>

      {/* Favorites filter */}
      <button
        onClick={() =>
          handleFilterChange('showFavorites', !filters.showFavorites)
        }
        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${
          filters.showFavorites
            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
            : 'bg-[#2f2f2f] hover:bg-[#404040] border border-transparent'
        }`}
      >
        <Heart
          size={14}
          className={filters.showFavorites ? 'fill-current' : ''}
        />
        Favoritas
        {taskCounts.favorites > 0 && (
          <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {taskCounts.favorites}
          </span>
        )}
      </button>

      {/* Color filter */}
      <div className="relative">
        <button
          onClick={() => setShowColorFilter(!showColorFilter)}
          className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ${
            filters.color !== 'all'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-[#2f2f2f] hover:bg-[#404040] border border-transparent'
          }`}
        >
          <Palette size={14} />
          {filters.color === 'all' ? 'Todas as cores' : 'Cor filtrada'}
          {filters.color !== 'all' && (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: filters.color }}
            />
          )}
        </button>

        {showColorFilter && (
          <div className="absolute top-full left-0 mt-2 p-2 bg-[#1e1e1e] border border-[#2f2f2f] rounded-lg shadow-lg z-10 min-w-[200px]">
            <div className="grid grid-cols-3 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => {
                    handleFilterChange('color', color.value);
                    setShowColorFilter(false);
                  }}
                  className={`flex items-center gap-2 p-2 rounded text-sm transition-colors ${
                    filters.color === color.value
                      ? 'bg-[#404040]'
                      : 'hover:bg-[#2f2f2f]'
                  }`}
                >
                  {color.value !== 'all' ? (
                    <div
                      className="w-4 h-4 rounded-full border border-[#404040]"
                      style={{ backgroundColor: color.value }}
                    />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-[#404040] bg-gradient-to-r from-red-500 via-blue-500 to-green-500" />
                  )}
                  <span className="truncate">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status info */}
      <div className="flex items-center gap-4 ml-auto text-sm text-gray-400">
        <span>Total: {taskCounts.total}</span>
        <span>Pendentes: {taskCounts.pending}</span>
        <span>Concluídas: {taskCounts.completed}</span>
      </div>

      {/* Click outside to close color filter */}
      {showColorFilter && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowColorFilter(false)}
        />
      )}
    </div>
  );
}

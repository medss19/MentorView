// frontend/src/components/Dashboard/StatsCard.js
import React from 'react';

const StatsCard = ({ title, value, max, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    red: 'bg-red-500 text-white'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800">
            {typeof value === 'string' ? value : `${value}${max ? `/${max}` : ''}`}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-full ${colorClasses[color]} flex items-center justify-center`}>
          {typeof value === 'number' && (
            <span className="text-lg font-bold">{value}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
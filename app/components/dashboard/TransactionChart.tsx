// components/dashboard/TransactionChart.tsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useTranslations } from 'next-intl';

interface ChartData {
  name: string;
  income: number;
  expense: number;
}

interface TransactionChartProps {
  data: ChartData[];
  variant?: 'bar' | 'area';
}

const TransactionChart: React.FC<TransactionChartProps> = ({ 
  data, 
  variant = 'bar' 
}) => {
  const t = useTranslations('Dashboard');
  
  // Formatte les valeurs pour l'affichage (ex: 1500 -> 1.5K)
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  // Personnalisation du tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{label}</p>
          <p className="text-green-600">
            {t('income')}: <span className="font-semibold">{payload[0].value.toLocaleString()}</span>
          </p>
          <p className="text-red-500">
            {t('expense')}: <span className="font-semibold">{payload[1].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Gestionnaire pour changer le type de graphique
  const handleChartChange = (type: 'bar' | 'area') => {
    if (variant !== type) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('chart', type);
      window.history.pushState({}, '', newUrl.toString());
      window.location.reload();
    }
  };

  return (
    <div className="w-full h-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          {t('transactionTrends')}
        </h3>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 rounded text-sm ${
              variant === 'bar' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => handleChartChange('bar')}
          >
            {t('bars')}
          </button>
          <button 
            className={`px-3 py-1 rounded text-sm ${
              variant === 'area' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => handleChartChange('area')}
          >
            {t('areas')}
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        {variant === 'bar' ? (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              formatter={(value) => (
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {value === 'income' ? t('income') : t('expense')}
                </span>
              )}
            />
            <Bar 
              dataKey="income" 
              name="income" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={30}
            />
            <Bar 
              dataKey="expense" 
              name="expense" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={30}
            />
          </BarChart>
        ) : (
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              stroke="#6b7280" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              formatter={(value) => (
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  {value === 'income' ? t('income') : t('expense')}
                </span>
              )}
            />
            <Area 
              type="monotone" 
              dataKey="income" 
              name="income" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#incomeGradient)" 
            />
            <Area 
              type="monotone" 
              dataKey="expense" 
              name="expense" 
              stroke="#ef4444" 
              fillOpacity={1} 
              fill="url(#expenseGradient)" 
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import Card from './Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const CategoryChart = ({ transactions, type = 'doughnut' }) => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  // Group expenses by category
  const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  const colors = [
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#8B5A2B', // Brown
    '#6B7280', // Gray
    '#06B6D4', // Cyan
  ];

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: amounts,
        backgroundColor: colors.slice(0, categories.length),
        borderColor: colors.slice(0, categories.length).map(color => color + '80'),
        borderWidth: type === 'bar' ? 1 : 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: type === 'bar' ? 'top' : window.innerWidth < 768 ? 'bottom' : 'right',
        labels: {
          color: '#E5E7EB',
          usePointStyle: true,
          padding: window.innerWidth < 768 ? 10 : 20,
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#374151',
        titleColor: '#F9FAFB',
        bodyColor: '#E5E7EB',
        borderColor: '#6B7280',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `${context.label}: $${context.parsed.toFixed(2)}`;
          }
        }
      },
    },
    scales: type === 'bar' ? {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#9CA3AF',
          callback: function(value) {
            return '$' + value;
          },
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          }
        },
        grid: {
          color: '#374151',
        }
      },
      x: {
        ticks: {
          color: '#9CA3AF',
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          }
        },
        grid: {
          color: '#374151',
        }
      }
    } : {},
  };

  if (categories.length === 0) {
    return (
      <Card>
        <h3 className="text-white text-lg font-semibold mb-4 sm:mb-6">Category Breakdown</h3>
        <div className="flex flex-col items-center justify-center h-48 sm:h-64 text-gray-400">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
            📊
          </div>
          <p className="text-sm sm:text-base">No expense data available</p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Add some transactions to see the breakdown</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-white text-lg font-semibold">Category Breakdown</h3>
        <div className="flex space-x-1 sm:space-x-2">
          <button 
            onClick={() => {}} 
            className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${type === 'doughnut' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Pie
          </button>
          <button 
            onClick={() => {}} 
            className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${type === 'bar' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Bar
          </button>
        </div>
      </div>
      
      <div className="h-64 sm:h-80">
        {type === 'doughnut' ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>

      {/* Category Summary */}
      <div className="mt-4 sm:mt-6 space-y-2">
        {categories.slice(0, 5).map((category, index) => (
          <div key={category} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index] }}
              ></div>
              <span className="text-gray-300 text-xs sm:text-sm truncate">{category}</span>
            </div>
            <span className="text-white font-medium text-xs sm:text-sm">${categoryTotals[category].toFixed(2)}</span>
          </div>
        ))}
        {categories.length > 5 && (
          <div className="text-gray-400 text-xs sm:text-sm text-center pt-2">
            +{categories.length - 5} more categories
          </div>
        )}
      </div>
    </Card>
  );
};

export default CategoryChart;

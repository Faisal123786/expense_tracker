import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import Card from './Card';

const SummaryStats = ({ totalIncome = 0, totalExpenses = 0, balance = 0 }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Balance Card */}
      <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-purple-500/30">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-300 text-sm mb-2">Total Balance</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            ${Math.abs(balance).toLocaleString()}
          </h2>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
            balance >= 0 
              ? 'bg-green-900/50 text-green-400' 
              : 'bg-red-900/50 text-red-400'
          }`}>
            {balance >= 0 ? (
              <>
                <TrendingUp className="w-4 h-4 mr-1" />
                Positive
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4 mr-1" />
                Negative
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Income/Expense Summary */}
      <Card>
        <h3 className="text-white text-lg font-semibold mb-6 text-center">Financial Summary</h3>
        <div className="space-y-4">
          {/* Income */}
          <div className="flex items-center justify-between p-4 bg-green-900/20 rounded-lg border border-green-500/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-green-400 font-medium">Total Income</p>
                <p className="text-gray-400 text-sm">Money received</p>
              </div>
            </div>
            <span className="text-green-400 font-bold text-lg">+${totalIncome.toLocaleString()}</span>
          </div>

          {/* Expenses */}
          <div className="flex items-center justify-between p-4 bg-red-900/20 rounded-lg border border-red-500/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-red-400 font-medium">Total Expenses</p>
                <p className="text-gray-400 text-sm">Money spent</p>
              </div>
            </div>
            <span className="text-red-400 font-bold text-lg">-${totalExpenses.toLocaleString()}</span>
          </div>

          {/* Net Balance */}
          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">Net Balance</span>
              <span className={`font-bold text-xl ${
                balance >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {balance >= 0 ? '+' : '-'}${Math.abs(balance).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SummaryStats;

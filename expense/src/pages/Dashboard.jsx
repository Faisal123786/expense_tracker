import SummaryStats from '../components/SummaryStats';
import CategoryChart from '../components/CategoryChart';
import { useTransactionsContext } from '../context/TransactionsContext';

const Dashboard = () => {
  const {
    transactions,
    loading,
    summary,
  } = useTransactionsContext();

  if (loading) {
    return (
      <div className="p-4 sm:p-6 space-y-6 bg-gray-900 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gray-900 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400 text-sm sm:text-base">Overview of your financial activity</p>
      </div>

      {/* Main Layout: summary cards row on top, full-width category breakdown below */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 items-start">
        <SummaryStats 
          totalIncome={summary.totalIncome}
          totalExpenses={summary.totalExpenses}
          balance={summary.balance}
        />

        <CategoryChart transactions={transactions} type="doughnut" />
      </div>
    </div>
  );
};

export default Dashboard;

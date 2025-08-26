import { useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import SummaryStats from '../components/SummaryStats';
import CategoryChart from '../components/CategoryChart';
import { useTransactionsContext } from '../context/TransactionsContext';
import { useToast } from '../components/Toast';

const Transactions = () => {
  const [chartType, setChartType] = useState('doughnut');
  const {
    transactions,
    loading,
    error,
    summary,
    addTransaction,
    deleteTransaction,
  } = useTransactionsContext();

  const { addToast } = useToast();

  const handleAddTransaction = async (transaction) => {
    try {
      await addTransaction(transaction);
      addToast('Transaction added', 'success');
    } catch (err) {
      console.error('Failed to add transaction:', err);
      addToast('Failed to add transaction', 'error');
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id);
      addToast('Transaction deleted', 'success');
    } catch (err) {
      console.error('Failed to delete transaction:', err);
      addToast('Failed to delete transaction', 'error');
    }
  };

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
    <div className="p-4 sm:p-6 space-y-6 bg-gray-900 min-h-screen">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Transactions</h1>
        <p className="text-gray-400 text-sm sm:text-base">Manage your income and expenses</p>
        {error && (
          <div className="mt-2 p-3 bg-red-900/50 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Transaction Form - Full Width at Top */}
      <div className="w-full mx-auto mb-8">
        <TransactionForm onAddTransaction={handleAddTransaction} />
      </div>

      {/* Cards Section - Below Form */}
      <div className="w-full">
        {/* Center: Transaction List */}
        <div className="">
          <TransactionList 
            transactions={transactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </div>
      </div>
    </div>
  );
};

export default Transactions;

import { useState, useEffect } from 'react';
import { transactionAPI } from '../api/transactions';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionAPI.getAll();
      setTransactions(data);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
      // For now, use empty array if backend is not available
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction) => {
    setError(null);
    try {
      // For now, add locally if backend is not available
      const newTransaction = {
        ...transaction,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      
      // Try to save to backend
      try {
        const savedTransaction = await transactionAPI.create(newTransaction);
        setTransactions([savedTransaction, ...transactions]);
      } catch (backendError) {
        // If backend fails, add locally
        console.warn('Backend not available, adding transaction locally');
        setTransactions([newTransaction, ...transactions]);
      }
      
      return newTransaction;
    } catch (err) {
      setError('Failed to add transaction');
      console.error('Error adding transaction:', err);
      throw err;
    }
  };

  const deleteTransaction = async (id) => {
    setError(null);
    try {
      // Remove from local state immediately for better UX
      setTransactions(transactions.filter(t => t.id !== id));
      
      // Try to delete from backend
      try {
        await transactionAPI.delete(id);
      } catch (backendError) {
        console.warn('Backend not available, transaction deleted locally only');
      }
    } catch (err) {
      setError('Failed to delete transaction');
      console.error('Error deleting transaction:', err);
      // Restore transaction if deletion failed
      fetchTransactions();
      throw err;
    }
  };

  const updateTransaction = async (id, updatedTransaction) => {
    setError(null);
    try {
      const updated = await transactionAPI.update(id, updatedTransaction);
      setTransactions(transactions.map(t => t.id === id ? updated : t));
      return updated;
    } catch (err) {
      setError('Failed to update transaction');
      console.error('Error updating transaction:', err);
      throw err;
    }
  };

  // Calculate summary statistics
  const summary = {
    totalIncome: transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
    totalExpenses: transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
    get balance() {
      return this.totalIncome - this.totalExpenses;
    },
    transactionCount: transactions.length,
    incomeCount: transactions.filter(t => t.type === 'income').length,
    expenseCount: transactions.filter(t => t.type === 'expense').length,
  };

  // Get transactions by category
  const getTransactionsByCategory = () => {
    return transactions.reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(transaction);
      return acc;
    }, {});
  };

  // Get recent transactions (last 10)
  const getRecentTransactions = (limit = 10) => {
    return transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  return {
    transactions,
    loading,
    error,
    summary,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    fetchTransactions,
    getTransactionsByCategory,
    getRecentTransactions,
  };
};

export default useTransactions;

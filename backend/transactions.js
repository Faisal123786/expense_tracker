// In-memory storage for transactions
let transactions = [];
let currentId = 1;

// Get all transactions
const getTransactions = () => transactions;

// Add a new transaction
const addTransaction = (transaction) => {
  const newTransaction = {
    id: currentId++,
    ...transaction,
    date: new Date().toISOString()
  };
  transactions.push(newTransaction);
  return newTransaction;
};

// Delete a transaction by ID
const deleteTransaction = (id) => {
  const index = transactions.findIndex(t => t.id === parseInt(id));
  if (index !== -1) {
    transactions.splice(index, 1);
    return true;
  }
  return false;
};

// Validate transaction data
const validateTransaction = (transaction) => {
  const errors = [];
  
  if (!transaction.title || transaction.title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (!transaction.amount || isNaN(parseFloat(transaction.amount)) || parseFloat(transaction.amount) <= 0) {
    errors.push('Amount must be a positive number');
  }
  
  if (!transaction.category || transaction.category.trim() === '') {
    errors.push('Category is required');
  }
  
  if (!transaction.type || (transaction.type !== 'income' && transaction.type !== 'expense')) {
    errors.push('Type must be either income or expense');
  }
  
  return errors;
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
  validateTransaction
};
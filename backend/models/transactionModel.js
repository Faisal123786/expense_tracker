let transactions = [];
let currentId = 1;

const getAll = () => transactions;

const getById = (id) => transactions.find(t => t.id === parseInt(id));

const create = (transaction) => {
  const newTransaction = {
    id: currentId++,
    ...transaction,
    date: new Date().toISOString()
  };
  transactions.push(newTransaction);
  return newTransaction;
};

const remove = (id) => {
  const index = transactions.findIndex(t => t.id === parseInt(id));
  if (index !== -1) {
    transactions.splice(index, 1);
    return true;
  }
  return false;
};


const getFinancialSummary = () => {
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpenses;
  
  return {
    totalIncome: parseFloat(totalIncome.toFixed(2)),
    totalExpenses: parseFloat(totalExpenses.toFixed(2)),
    netBalance: parseFloat(netBalance.toFixed(2)),
  };
};


module.exports = {
  getAll,
  getById,
  create,
  remove,
  getFinancialSummary
};
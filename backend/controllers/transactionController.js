const transactionModel = require('../models/transactionModel');

const getTransactions = (req, res) => {
  try {
    const transactions = transactionModel.getAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

const createTransaction = (req, res) => {
  try {
    const newTransaction = transactionModel.create(req.validatedData);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
};

const deleteTransaction = (req, res) => {
  try {
    const { id } = req.params;
    const success = transactionModel.remove(id);
    
    if (success) {
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};

const getFinancialSummary = (req, res) => {
  try {
    const summary = transactionModel.getFinancialSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch financial summary' });
  }
};

const getAnalytics = (req, res) => {
    try {
    const transactions = transactionModel.getAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};


module.exports = {
  getTransactions,
  createTransaction,
  deleteTransaction,
  getFinancialSummary,
  getAnalytics
};
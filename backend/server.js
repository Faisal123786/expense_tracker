const express = require('express');
const cors = require('cors');
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  validateTransaction
} = require('./transactions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/transactions', (req, res) => {
  try {
    const transactions = getTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.post('/api/transactions', (req, res) => {
  try {
    const errors = validateTransaction(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    const transaction = {
      title: req.body.title.trim(),
      amount: parseFloat(req.body.amount),
      category: req.body.category.trim(),
      type: req.body.type
    };
    
    const newTransaction = addTransaction(transaction);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add transaction' });
  }
});

app.delete('/api/transactions/:id', (req, res) => {
  try {
    const { id } = req.params;
    const success = deleteTransaction(id);
    
    if (success) {
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
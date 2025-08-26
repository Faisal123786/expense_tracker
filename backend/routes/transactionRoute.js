const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { validateTransaction } = require('../middleware/validation');

router.get('/', transactionController.getTransactions);
router.post('/', validateTransaction, transactionController.createTransaction);
router.delete('/:id', transactionController.deleteTransaction);
router.get('/summary', transactionController.getFinancialSummary);
router.get('/analytics', transactionController.getAnalytics);

module.exports = router;
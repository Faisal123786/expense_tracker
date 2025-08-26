// Validate transaction data
const validateTransaction = (req, res, next) => {
  const { title, amount, category, type } = req.body;
  const errors = [];
  
  if (!title || title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    errors.push('Amount must be a positive number');
  }
  
  if (!category || category.trim() === '') {
    errors.push('Category is required');
  }
  
  if (!type || (type !== 'income' && type !== 'expense')) {
    errors.push('Type must be either income or expense');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  // Add cleaned data to request for controller to use
  req.validatedData = {
    title: title.trim(),
    amount: parseFloat(amount),
    category: category.trim(),
    type
  };
  
  next();
};

module.exports = {
  validateTransaction
};
import { useState } from 'react';
import { Plus, DollarSign } from 'lucide-react';
import Card from './Card';

const TransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'expense'
  });

  const categories = [
    'Food ',
    'Rent',
    'shopping'
  ];

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.title && formData.amount && formData.category) {
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date().toISOString(),
        id: Date.now().toString()
      };
      try {
        setSubmitting(true);
        await onAddTransaction(payload);
        setFormData({
          title: '',
          amount: '',
          category: '',
          type: 'expense'
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-700 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Add New Transaction</h2>
        <p className="text-gray-400">Track your income and expenses efficiently</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transaction Type Toggle - Prominent */}
        <div className="flex bg-gray-700/50 rounded-xl p-1.5 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setFormData({...formData, type: 'expense'})}
            className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 ${
              formData.type === 'expense'
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105'
                : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
            }`}
          >
            💸 Expense
          </button>
          <button
            type="button"
            onClick={() => setFormData({...formData, type: 'income'})}
            className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 ${
              formData.type === 'income'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
            }`}
          >
            💰 Income
          </button>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title Input */}
          <div className="md:col-span-2">
            <label className="block text-gray-300 text-sm font-semibold mb-3">
              📝 Transaction Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Grocery shopping, Salary, Coffee..."
              className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none text-sm sm:text-base backdrop-blur-sm transition-all duration-200"
              required
            />
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-3">
              💵 Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full bg-gray-700/50 text-white pl-10 pr-4 py-3 rounded-xl border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none text-sm sm:text-base backdrop-blur-sm transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-3">
              🏷️ Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-700/50 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none text-sm sm:text-base backdrop-blur-sm transition-all duration-200"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center space-x-3 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transform transition duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-purple-200/40"
        >
          {submitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              <span className="text-sm font-semibold">Adding...</span>
            </>
          ) : (
            <>
              <span className="text-sm font-semibold">Add Transaction</span>
              <Plus className="w-5 h-5 opacity-90" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;

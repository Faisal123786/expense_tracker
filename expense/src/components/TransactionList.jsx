import { Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h3 className="text-white text-lg font-semibold">Transaction Table</h3>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
          <p className="text-gray-400">No transactions yet</p>
          <p className="text-gray-500 text-sm mt-1">Add your first transaction to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-300 font-medium pb-3 text-sm sm:text-base">Title</th>
                <th className="text-left text-gray-300 font-medium pb-3 text-sm sm:text-base">Amount</th>
                <th className="text-left text-gray-300 font-medium pb-3 text-sm sm:text-base hidden sm:table-cell">Category</th>
                <th className="text-left text-gray-300 font-medium pb-3 text-sm sm:text-base">Type</th>
                <th className="text-center text-gray-300 font-medium pb-3 text-sm sm:text-base">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr 
                  key={transaction.id} 
                  className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                >
                  <td className="py-3 pr-4">
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">{transaction.title}</p>
                      <p className="text-gray-400 text-xs sm:text-sm">{formatDate(transaction.date)}</p>
                      <p className="text-gray-400 text-xs sm:hidden">{transaction.category}</p>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`font-semibold text-sm sm:text-base ${
                      transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 pr-4 hidden sm:table-cell">
                    <span className="text-gray-300 text-sm">{transaction.category}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center space-x-2">
                      {transaction.type === 'income' ? (
                        <ArrowDownLeft className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm font-medium ${
                        transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-center">
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="p-1 sm:p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;

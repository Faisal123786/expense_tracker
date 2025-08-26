import { 
  LayoutDashboard, 
  CreditCard, 
  Settings,
  User,
  X,
  Menu
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'transactions', icon: CreditCard, label: 'Transactions' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-850 min-h-screen p-4 border-r border-gray-800 shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white lg:hidden"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-lg mr-3 shadow-md"></div>
          <span className="text-white font-bold text-lg">Budget Tracker</span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false); // Close mobile menu on selection
                }}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-inner'
                    : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        
      </div>
    </>
  );
};

export default Sidebar;

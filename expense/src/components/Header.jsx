import { Search, Bell, Menu, User } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Mobile Menu + Search */}
        <div className="flex items-center flex-1 max-w-md">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="text-gray-400 hover:text-white mr-4 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-white text-sm font-medium">User</div>
              <div className="text-gray-400 text-xs">Budget Tracker</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

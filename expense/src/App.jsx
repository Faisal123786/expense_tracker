import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import { TransactionsProvider } from './context/TransactionsContext'
import { ToastProvider } from './components/Toast'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'transactions':
        return <Transactions />
      default:
        return <Dashboard />
    }
  }

  return (
    <TransactionsProvider>
      <ToastProvider>
        <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto">
          {renderPage()}
        </main>
      </div>
        </div>
      </ToastProvider>
    </TransactionsProvider>
  )
}

export default App

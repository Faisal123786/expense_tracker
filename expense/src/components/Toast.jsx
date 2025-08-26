import { createContext, useContext, useState, useEffect } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', ttl = 3000) => {
    const id = Date.now().toString();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => removeToast(id), ttl);
  };

  const removeToast = (id) => {
    setToasts((t) => t.filter(x => x.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed right-4 bottom-6 z-50 space-y-2">
        {toasts.map((toast) => (
          <div key={toast.id} className={`max-w-xs w-full px-4 py-3 rounded-lg shadow-lg text-sm text-white ${
            toast.type === 'info' ? 'bg-gray-800' : toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};

export default ToastContext;

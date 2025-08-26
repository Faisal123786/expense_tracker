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
      <div className="fixed right-4 top-4 z-50 space-y-2">
        {toasts.map((toast) => {
          const base = 'max-w-xs w-full px-4 py-3 rounded-lg shadow-lg text-sm text-white';
          const bgClass = toast.type === 'info'
            ? 'bg-gray-800'
            : toast.type === 'success'
              ? 'bg-emerald-600'
              : 'bg-red-600';
          return (
            <div key={toast.id} className={`${base} ${bgClass}`} role="status" aria-live="polite">
              {toast.message}
            </div>
          );
        })}
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

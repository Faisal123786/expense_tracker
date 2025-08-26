import React, { createContext, useContext } from 'react';
import useTransactions from '../hooks/useTransactions';

const TransactionsContext = createContext(null);

export const TransactionsProvider = ({ children }) => {
  const transactionsApi = useTransactions();
  return (
    <TransactionsContext.Provider value={transactionsApi}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactionsContext = () => {
  const ctx = useContext(TransactionsContext);
  if (!ctx) {
    throw new Error('useTransactionsContext must be used within TransactionsProvider');
  }
  return ctx;
};

export default TransactionsContext;

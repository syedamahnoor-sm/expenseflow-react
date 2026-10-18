import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

const starterTransactions = [
  { id: 'demo-1', description: 'Monthly salary', amount: 145000, type: 'income', category: 'Salary', date: '2026-10-01' },
  { id: 'demo-2', description: 'Groceries', amount: 8500, type: 'expense', category: 'Food & Drinks', date: '2026-10-05' },
  { id: 'demo-3', description: 'Electricity bill', amount: 12300, type: 'expense', category: 'Bills', date: '2026-10-09' },
  { id: 'demo-4', description: 'Freelance project', amount: 32000, type: 'income', category: 'Freelance', date: '2026-10-12' },
  { id: 'demo-5', description: 'Transport', amount: 3400, type: 'expense', category: 'Transport', date: '2026-10-14' },
  { id: 'demo-6', description: 'New headphones', amount: 6200, type: 'expense', category: 'Shopping', date: '2026-10-16' },
];

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage('expenseflow.transactions.v1', starterTransactions);

  const addTransaction = (transaction) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    setTransactions((previous) => [{ ...transaction, id }, ...previous]);
  };
  const deleteTransaction = (id) => setTransactions((previous) => previous.filter((item) => item.id !== id));
  const clearTransactions = () => setTransactions([]);

  const totals = useMemo(() => transactions.reduce((acc, item) => {
    acc[item.type] += Number(item.amount);
    return acc;
  }, { income: 0, expense: 0 }), [transactions]);

  return { transactions, addTransaction, deleteTransaction, clearTransactions, totals };
}

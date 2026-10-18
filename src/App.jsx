import { useMemo, useState } from 'react';
import { ChartNoAxesCombined, CircleHelp, ReceiptText, RotateCcw } from 'lucide-react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import SummaryCard from './components/SummaryCard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import CategoryChart from './components/CategoryChart';
import LiveClock from './components/LiveClock';
import { useTransactions } from './hooks/useTransactions';
import './App.css';

const formatCurrency = (amount) => new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(amount);

export default function App() {
  const { transactions, addTransaction, deleteTransaction, clearTransactions, totals } = useTransactions();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [month, setMonth] = useState('all');

  const months = useMemo(() => [...new Set(transactions.map((item) => item.date.slice(0, 7)))].sort().reverse(), [transactions]);
  const monthTransactions = useMemo(() => transactions.filter((item) => month === 'all' || item.date.startsWith(month)), [transactions, month]);
  const visibleTransactions = useMemo(() => monthTransactions.filter((item) => (filter === 'all' || item.type === filter) && `${item.description} ${item.category}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => b.date.localeCompare(a.date)), [monthTransactions, filter, search]);
  const periodTotals = useMemo(() => monthTransactions.reduce((acc, item) => ({ ...acc, [item.type]: acc[item.type] + Number(item.amount) }), { income: 0, expense: 0 }), [monthTransactions]);

  return (
    <div className="app-shell">
      <Navbar transactionCount={transactions.length}/>
      <main className="page-container">
        <div className="page-intro"><div><span className="eyebrow"><ChartNoAxesCombined size={15}/> YOUR FINANCIAL OVERVIEW</span><h1>Take control of your <span>money.</span></h1><p>Track your spending, understand your habits, and stay on top of your finances.</p><LiveClock/></div><label className="month-picker">View period<select value={month} onChange={(event) => setMonth(event.target.value)}><option value="all">All time</option>{months.map((value) => <option key={value} value={value}>{new Date(`${value}-01T12:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</option>)}</select></label></div>
        <div className="summary-grid"><SummaryCard label="Total Balance" amount={periodTotals.income - periodTotals.expense} formatCurrency={formatCurrency}/><SummaryCard label="Total Income" amount={periodTotals.income} kind="income" formatCurrency={formatCurrency}/><SummaryCard label="Total Expenses" amount={periodTotals.expense} kind="expense" formatCurrency={formatCurrency}/></div>
        <div className="content-grid"><div className="main-column"><Card title="Transaction history" action={<span className="muted-count"><ReceiptText size={15}/> {visibleTransactions.length} shown</span>}><TransactionList transactions={visibleTransactions} search={search} onSearchChange={setSearch} filter={filter} onFilterChange={setFilter} onDelete={deleteTransaction} formatCurrency={formatCurrency}/></Card><Card title="Spending by category"><CategoryChart transactions={monthTransactions} formatCurrency={formatCurrency}/></Card></div><div className="side-column"><Card title="Add a transaction"><TransactionForm onAdd={addTransaction}/></Card><div className="tip-card"><CircleHelp size={21}/><div><strong>Good to know</strong><p>Your transactions are saved locally in this browser. No account or server is required.</p></div></div><button className="clear-btn" onClick={() => { if (transactions.length && window.confirm('Delete all transactions? This cannot be undone.')) clearTransactions(); }} disabled={!transactions.length}><RotateCcw size={15}/> Clear all transactions</button></div></div>
      </main>
      <footer className="footer">ExpenseFlow <span>•</span> Built with React + Vite <span>•</span> Practice project</footer>
    </div>
  );
}

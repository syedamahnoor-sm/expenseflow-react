import { ArrowUpRight, WalletCards } from 'lucide-react';
export default function Navbar({ transactionCount = 0 }) {
  return (
    <header className="topbar">
      <div className="brand"><span className="brand-icon"><WalletCards size={22}/></span><span>Expense<span className="brand-accent">Flow</span></span></div>
      <div className="topbar-right"><span className="topbar-caption">PERSONAL FINANCE DASHBOARD</span><span className="count-pill">{transactionCount} transactions <ArrowUpRight size={14}/></span></div>
    </header>
  );
}

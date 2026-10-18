import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';
export default function SummaryCard({ label, amount, kind = 'balance', formatCurrency }) {
  const Icon = kind === 'income' ? ArrowDownLeft : kind === 'expense' ? ArrowUpRight : Wallet;
  return (
    <div className={`summary-card summary-${kind}`}>
      <div className="summary-top"><span>{label}</span><span className="summary-icon"><Icon size={20}/></span></div>
      <div className="summary-amount">{formatCurrency(amount)}</div>
      <p>{kind === 'balance' ? 'Your overall financial position' : kind === 'income' ? 'Money coming in' : 'Money going out'}</p>
    </div>
  );
}

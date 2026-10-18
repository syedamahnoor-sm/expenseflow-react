import { Trash2, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
export default function TransactionItem({ transaction, onDelete, formatCurrency }) {
  const { id, description, amount, type, category, date } = transaction;
  const isIncome = type === 'income';
  return (
    <li className="transaction-item">
      <span className={`transaction-symbol ${isIncome ? 'symbol-income' : 'symbol-expense'}`}>{isIncome ? <ArrowDownLeft size={19}/> : <ArrowUpRight size={19}/>}</span>
      <div className="transaction-details"><strong>{description}</strong><span>{category} <span className="dot">•</span> {new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></div>
      <span className={`transaction-amount ${isIncome ? 'positive' : 'negative'}`}>{isIncome ? '+' : '−'}{formatCurrency(amount)}</span>
      <button type="button" className="delete-btn" onClick={() => onDelete(id)} aria-label={`Delete ${description}`} title="Delete transaction"><Trash2 size={17}/></button>
    </li>
  );
}

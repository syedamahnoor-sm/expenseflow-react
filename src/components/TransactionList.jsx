import { Search, Inbox } from 'lucide-react';
import TransactionItem from './TransactionItem';
export default function TransactionList({ transactions, search, onSearchChange, filter, onFilterChange, onDelete, formatCurrency }) {
  return (
    <div>
      <div className="list-tools"><label className="search-box"><Search size={17}/><input aria-label="Search transactions" placeholder="Search transactions..." value={search} onChange={(event) => onSearchChange(event.target.value)}/></label><select aria-label="Filter transaction type" className="filter-select" value={filter} onChange={(event) => onFilterChange(event.target.value)}><option value="all">All types</option><option value="income">Income</option><option value="expense">Expenses</option></select></div>
      {transactions.length ? <ul className="transaction-list">{transactions.map((transaction) => <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDelete} formatCurrency={formatCurrency}/>)}</ul> : <div className="empty-state"><Inbox size={34}/><strong>No transactions found</strong><p>Try changing your filters or add a new transaction.</p></div>}
    </div>
  );
}

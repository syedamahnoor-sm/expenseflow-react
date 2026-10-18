import { categoryColors } from '../data/categories';
export default function CategoryChart({ transactions, formatCurrency }) {
  const expenses = transactions.filter((item) => item.type === 'expense');
  const totals = expenses.reduce((acc, item) => ({ ...acc, [item.category]: (acc[item.category] || 0) + Number(item.amount) }), {});
  const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, amount]) => sum + amount, 0);
  let position = 0;
  const stops = entries.map(([category, amount]) => {
    const start = position;
    position += amount / total * 100;
    return `${categoryColors[category] || '#94a3b8'} ${start}% ${position}%`;
  });
  return entries.length ? (
    <div className="category-content"><div className="donut" style={{ background: `conic-gradient(${stops.join(', ')})` }}><div className="donut-hole"><span>Total spent</span><strong>{formatCurrency(total)}</strong></div></div><div className="category-legend">{entries.map(([category, amount]) => <div className="legend-row" key={category}><span className="legend-label"><span className="legend-dot" style={{ backgroundColor: categoryColors[category] || '#94a3b8' }}/>{category}</span><strong>{Math.round(amount / total * 100)}%</strong></div>)}</div></div>
  ) : <p className="chart-empty">Add an expense to see your spending breakdown.</p>;
}

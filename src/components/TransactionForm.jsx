import { useState } from 'react';
import { Plus } from 'lucide-react';
import { expenseCategories, incomeCategories } from '../data/categories';

const today = () => new Date().toLocaleDateString('en-CA');
const initialForm = { description: '', amount: '', type: 'expense', category: 'Food & Drinks', date: today() };

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const categories = form.type === 'expense' ? expenseCategories : incomeCategories;

  const update = (field, value) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const changeType = (type) => {
    setForm((previous) => ({ ...previous, type, category: type === 'expense' ? expenseCategories[0] : incomeCategories[0] }));
    setErrors({});
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!form.description.trim()) nextErrors.description = 'Please enter a description.';
    if (!Number.isFinite(Number(form.amount)) || Number(form.amount) <= 0) nextErrors.amount = 'Amount must be greater than zero.';
    if (!form.date || Number.isNaN(new Date(`${form.date}T12:00:00`).getTime())) nextErrors.date = 'Please select a valid date.';
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    onAdd({ ...form, description: form.description.trim(), amount: Number(form.amount) });
    setForm({ ...initialForm, date: today() });
    setErrors({});
  };

  return (
    <form onSubmit={submit} noValidate className="transaction-form">
      <div className="type-toggle" role="group" aria-label="Transaction type">
        <button type="button" className={form.type === 'expense' ? 'selected' : ''} onClick={() => changeType('expense')}>− Expense</button>
        <button type="button" className={form.type === 'income' ? 'selected' : ''} onClick={() => changeType('income')}>+ Income</button>
      </div>
      <label>Description<input value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="e.g. Grocery shopping" maxLength={80} aria-invalid={!!errors.description}/>{errors.description && <span className="field-error">{errors.description}</span>}</label>
      <div className="form-row"><label>Amount (PKR)<input type="number" min="0.01" step="0.01" value={form.amount} onChange={(e) => update('amount', e.target.value)} placeholder="0.00" aria-invalid={!!errors.amount}/>{errors.amount && <span className="field-error">{errors.amount}</span>}</label><label>Category<select value={form.category} onChange={(e) => update('category', e.target.value)}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label></div>
      <label>Date<input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} aria-invalid={!!errors.date}/>{errors.date && <span className="field-error">{errors.date}</span>}</label>
      <button type="submit" className="primary-btn"><Plus size={18}/> Add transaction</button>
    </form>
  );
}

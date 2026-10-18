// `children`, prop destructuring, and a default parameter replace legacy function defaultProps.
export default function Card({ title, action = null, children, className = '' }) {
  return (
    <section className={`card ${className}`}>
      {(title || action) && <div className="card-heading"><h2>{title}</h2>{action}</div>}
      {children}
    </section>
  );
}

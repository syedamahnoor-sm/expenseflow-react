import { useEffect, useState } from 'react';
export default function LiveClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval); // cleanup avoids leaving timers running
  }, []);
  return <span className="live-clock">{now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>;
}

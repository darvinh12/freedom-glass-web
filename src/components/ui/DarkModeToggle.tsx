import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      document.documentElement.classList.add('light');
      setIsLight(true);
    }
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Dark mode' : 'Light mode'}
      style={{
        background: 'none',
        border: '1.5px solid var(--border)',
        borderRadius: '999px',
        padding: '6px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        fontWeight: 500,
        transition: 'border-color 0.2s, color 0.2s',
      }}
    >
      <span style={{ fontSize: '1rem' }} aria-hidden="true">
        {isLight ? '🌙' : '☀️'}
      </span>
      <span style={{ display: 'none' }}>
        {isLight ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
  }, []);

  function toggle() {
    const root = document.documentElement;
    const nextIsLight = !isLight;
    if (nextIsLight) {
      root.setAttribute('data-theme', 'light');
      try {
        localStorage.setItem('md-theme', 'light');
      } catch (e) {}
    } else {
      root.removeAttribute('data-theme');
      try {
        localStorage.setItem('md-theme', 'dark');
      } catch (e) {}
    }
    setIsLight(nextIsLight);
  }

  return (
    <button
      className="search-btn"
      onClick={toggle}
      aria-label="Cambiar tema"
      title={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      type="button"
    >
      {isLight ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 2v2.5M12 19.5V22M22 12h-2.5M4.5 12H2M19 5l-1.8 1.8M6.8 17.2 5 19M19 19l-1.8-1.8M6.8 6.8 5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

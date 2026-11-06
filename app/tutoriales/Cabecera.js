import Link from 'next/link';
import ThemeToggle from '../../components/ThemeToggle';

export default function Cabecera() {
  return (
    <>
      <div className="bg-circuit" aria-hidden="true" />
      <header>
        <div className="logo">
          <img className="logo-mark" src="/logo.png" alt="Millonario Digital" />
          <Link href="/" className="logo-word" style={{ textDecoration: 'none' }}>
            <em>Millonario Digital</em>
          </Link>
        </div>
        <nav className="top-links">
          <Link href="/tutoriales">Tutoriales</Link>
          <ThemeToggle />
        </nav>
      </header>
    </>
  );
}

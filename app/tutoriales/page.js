import Link from 'next/link';
import Cabecera from './Cabecera';
import { TUTORIALES, CANAL_SUSCRIBIR } from '../../lib/tutoriales';
import './tutoriales.css';

export const metadata = {
  title: 'Tutoriales de herramientas de IA en español',
  description:
    'Tutoriales paso a paso, en español, para crear contenido con inteligencia artificial sin mostrar la cara: voz, imágenes, video, tiendas online y más.',
  alternates: { canonical: '/tutoriales' },
};

export default function TutorialesPage() {
  const lista = [...TUTORIALES].sort((a, b) => b.numero - a.numero);
  return (
    <>
      <Cabecera />
      <main className="tut-wrap">
        <span className="eyebrow mono">TUTORIALES EN VIDEO</span>
        <h1 className="tut-h1">Aprende una herramienta de IA cada semana</h1>
        <p className="tut-lead">
          Cada tutorial tiene su video paso a paso, el resumen para tenerlo a mano y los recursos que uso.
        </p>
        <div className="blog-grid tut-grid">
          {lista.map((t) => (
            <Link className="blog-card" href={`/tutoriales/${t.slug}`} key={t.slug}>
              <div className="thumb">
                <img src={`/tutoriales/${t.slug}.jpg`} alt={t.titulo} loading="lazy" decoding="async" />
              </div>
              <div className="body">
                <span className="cat-label">{t.herramienta.nombre.toUpperCase()}{!t.youtubeId && ' · PRÓXIMAMENTE'}</span>
                <h4>{t.titulo}</h4>
              </div>
            </Link>
          ))}
        </div>
        <p className="tut-lead" style={{ marginTop: 32 }}>
          <a className="btn btn-glow" href={CANAL_SUSCRIBIR} target="_blank" rel="noopener">
            Suscribirme al canal de YouTube
          </a>
        </p>
      </main>
    </>
  );
}

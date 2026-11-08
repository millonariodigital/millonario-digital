import Cabecera from '../tutoriales/Cabecera';
import TestNegocio from '../../components/TestNegocio';
import './test.css';

export const metadata = {
  title: 'Test: ¿qué negocio digital es para ti?',
  description:
    'Test gratis de 7 preguntas: descubre si tu camino es crear contenido con IA, una tienda online, servicios freelance o aprender a invertir, con tutoriales y primeros pasos.',
  alternates: { canonical: '/test-negocio-digital' },
  openGraph: {
    title: 'Test: ¿qué negocio digital es para ti?',
    description: '7 preguntas, 2 minutos. Descubre tu camino digital y cómo dar el primer paso.',
    images: [{ url: '/test/portada.jpg', width: 1200, height: 630 }],
  },
};

export default function TestPage() {
  return (
    <>
      <Cabecera />
      <main className="tn-wrap">
        <TestNegocio />
      </main>
    </>
  );
}

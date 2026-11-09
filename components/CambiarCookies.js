'use client';

import { useState } from 'react';
import { guardarEleccion } from './AvisoCookies';

// Botones de la página /cookies para cambiar la elección en cualquier momento.
export default function CambiarCookies() {
  const [estado, setEstado] = useState('');
  function elegir(acepta) {
    guardarEleccion(acepta);
    setEstado(acepta ? 'Aceptaste las cookies de analítica.' : 'Rechazaste las cookies de analítica.');
  }
  return (
    <div className="cambiar-cookies">
      <button type="button" className="aviso-cookies-btn" onClick={() => elegir(true)}>Aceptar analítica</button>
      <button type="button" className="aviso-cookies-btn" onClick={() => elegir(false)}>Rechazar analítica</button>
      {estado && <span className="cambiar-cookies-estado">{estado} Puedes cambiarlo cuando quieras.</span>}
    </div>
  );
}

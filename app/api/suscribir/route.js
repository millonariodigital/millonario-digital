// Pasa el correo de quien pidió la guía a Brevo (herramienta de correos).
// La clave de Brevo vive solo en el servidor (variables de entorno de Vercel);
// nunca se envía al navegador.
//
// Variables necesarias en Vercel (Settings -> Environment Variables):
//   BREVO_API_KEY  -> la clave de API de Brevo
//   BREVO_LIST_ID  -> el número de la lista "Guía gratis" (ej. 3)

export const dynamic = 'force-dynamic';

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function limpiar(valor, max = 60) {
  if (typeof valor !== 'string') return '';
  return valor.trim().slice(0, max);
}

async function enviarABrevo(cuerpo, apiKey) {
  return fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify(cuerpo),
  });
}

export async function POST(request) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);

  // Si todavía no se configuró Brevo, no hacemos nada (y no rompemos el formulario).
  if (!apiKey || !listId) {
    return Response.json({ ok: false, motivo: 'sin-configurar' });
  }

  let datos;
  try {
    datos = await request.json();
  } catch (e) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const email = limpiar(datos?.email, 200).toLowerCase();
  if (!EMAIL_OK.test(email)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const fuente = limpiar(datos?.fuente) || 'sitio';
  const interes = limpiar(datos?.interes);

  const base = { email, listIds: [listId], updateEnabled: true };
  const atributos = { FUENTE: fuente };
  if (interes) atributos.INTERES = interes;

  try {
    let r = await enviarABrevo({ ...base, attributes: atributos }, apiKey);

    // Si los atributos FUENTE / INTERES aún no existen en Brevo, lo
    // intentamos de nuevo solo con el correo para no perder el contacto.
    if (r.status === 400) {
      r = await enviarABrevo(base, apiKey);
    }

    return Response.json({ ok: r.ok });
  } catch (e) {
    return Response.json({ ok: false }, { status: 502 });
  }
}

/*const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");
const { v4: uuidv4 } = require("uuid");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Método no permitido");

  const { cedula } = req.body;

  const { data: user, error } = await supabase
    .from("usuario")
    .select("user_id, correo")
    .eq("cedula", cedula)
    .single();

  if (error || !user) return res.status(404).json({ error: "Usuario no encontrado" });

  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 minutos

  await supabase.from("reset_tokens").insert({
    token,
    user_id: user.user_id,
    expires_at: expiresAt.toISOString(),
  });

  const resetLink = `https://tuapp.com/reset-password?token=${token}`;

  await resend.emails.send({
    from: "Soporte <tucorreo@tuapp.com>",
    to: user.correo,
    subject: "Restablece tu contraseña",
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
           <a href="${resetLink}">${resetLink}</a>`,
  });

  res.status(200).json({ message: "Correo enviado" });
};
*/

// /api/request-password-reset.js

import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // importante: usa la clave de servicio aquí
);

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { cedula } = req.body;

    // 1. Buscar el correo real desde la tabla usuario
    const { data: user, error } = await supabase
        .from('usuario')
        .select('correo')
        .eq('cedula', cedula)
        .single();

    if (error || !user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // 2. Crear enlace de recuperación de contraseña
    const token = randomUUID();

    // Guarda el token
    await supabase.from("reset_tokens").insert({
        cedula,
        token,
        used: false,
    });

    const resetLink = `https://jcreamoshistoria.vercel.app/reset-password?token=${token}`;

    // 3. Enviar el enlace por correo usando Resend
    try {
        const emailRes = await resend.emails.send({
            from: 'jcreamoshistoria <onboarding@resend.dev>',
            to: user.correo,
            subject: 'Recuperación de contraseña',
            html: `<p>Hola,</p><p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="${data.action_link}">Restablecer contraseña</a></p>`,
        });

        return res.status(200).json({ message: 'Correo enviado', emailRes });
    } catch (err) {
        return res.status(500).json({ error: 'Error enviando el correo' });
    }
}

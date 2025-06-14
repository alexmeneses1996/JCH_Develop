// api/request-password-reset.js

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // O usa tu anon key si es solo lectura
);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Método no permitido");

  const { cedula } = req.body;

  if (!cedula) return res.status(400).json({ error: "Cédula requerida" });

  // 1. Buscar el correo real y el user_id en tu tabla de usuarios
  const { data, error } = await supabase
    .from("usuario")
    .select("correo")
    .eq("cedula", cedula)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const correoReal = data.correo;

  // 2. Enviar el enlace de restablecimiento a ese correo
  const { error: resetError } = await supabase.auth.resetPasswordForEmail(correoReal, {
    redirectTo: "https://jcreamoshistoria.vercel.app/reset-password", // Cambia esta URL a la de tu app
  });

  if (resetError) {
    return res.status(500).json({ error: "Error enviando el correo" });
  }

  return res.status(200).json({ mensaje: "Correo enviado" });
}

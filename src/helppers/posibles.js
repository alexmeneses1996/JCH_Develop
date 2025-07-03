// backend/api/registrar-usuario.js

/*import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { cedula, correo } = req.body;

  const token = uuidv4();

  await supabase.from("email_verification_tokens").insert({ cedula, token });

  await resend.emails.send({
    from: "Verificación <noreply@tudominio.com>",
    to: correo,
    subject: "Verifica tu correo electrónico",
    html: `<p>Haz clic en el siguiente enlace para verificar tu correo:</p>
           <a href="https://tusitio.com/verificar-correo?token=${token}">Verificar correo</a>`
  });

  return res.status(200).json({ mensaje: "Correo de verificación enviado." });
}

// frontend/pages/verificar-correo.jsx
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VerificarCorreo() {
  const [params] = useSearchParams();
  const [mensaje, setMensaje] = useState("Verificando...");

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      fetch(`/api/verificar-correo?token=${token}`)
        .then((res) => res.json())
        .then((data) => setMensaje(data.mensaje || data.error))
        .catch(() => setMensaje("Error al verificar el correo"));
    } else {
      setMensaje("Token inválido o faltante.");
    }
  }, [params]);

  return <h2>{mensaje}</h2>;
}

// backend/api/verificar-correo.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });

  const { token } = req.query;
  if (!token) return res.status(400).json({ error: "Token faltante" });

  const { data, error } = await supabase
    .from("email_verification_tokens")
    .select("cedula")
    .eq("token", token)
    .eq("usado", false)
    .single();

  if (error || !data) return res.status(400).json({ error: "Token inválido o ya usado" });

  // Marcar como usado (puedes también actualizar campo en tabla usuario si quieres)
  await supabase
    .from("email_verification_tokens")
    .update({ usado: true })
    .eq("token", token);

  return res.status(200).json({ mensaje: "Correo verificado exitosamente." });
}
*/
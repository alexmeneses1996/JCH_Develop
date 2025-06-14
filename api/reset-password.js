import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  const { token, nuevaClave } = req.body;

  const { data: tokenData, error } = await supabase
    .from("reset_tokens")
    .select("*")
    .eq("token", token)
    .eq("used", false)
    .maybeSingle();

  if (!tokenData || error) {
    return res.status(400).json({ error: "Token inválido o ya usado" });
  }

  // Obtener el user_id con la cédula
  const { data: usuario } = await supabase
    .from("usuario")
    .select("user_id")
    .eq("cedula", tokenData.cedula)
    .single();

  // Cambiar la contraseña
  const { error: updateError } = await supabase.auth.admin.updateUserById(usuario.user_id, {
    password: nuevaClave,
  });

  if (updateError) {
    return res.status(500).json({ error: "No se pudo actualizar la contraseña" });
  }

  // Marcar el token como usado
  await supabase
    .from("reset_tokens")
    .update({ used: true })
    .eq("token", token);

  return res.status(200).json({ mensaje: "Contraseña actualizada correctamente" });
}

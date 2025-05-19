import bcrypt from "bcryptjs";
import { supabase } from "../supabase/supabaseConfig";

export const loginConCedula = async (cedula, password) => {
  // 1. Buscar usuario por cédula
  const { data, error } = await supabase
    .from("usuario")
    .select("*")
    .eq("cedula", cedula)
    .single();

  if (error || !data) {
    return { success: false, message: "Cédula no encontrada" };
  }

  // 2. Comparar contraseñas
  const passwordValida = await bcrypt.compare(password, data.password);
  //const passwordValida = password == data.password ? true : false;
  if (!passwordValida) {
    return { success: false, message: "Contraseña incorrecta" };
  }

  // 3. Usuario autenticado correctamente
  return { success: true, user: data };
};

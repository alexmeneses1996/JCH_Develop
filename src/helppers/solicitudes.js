import bcrypt from "bcryptjs";
import { supabase_otro } from "../supabase/supabaseConfig";

export const mostrarSolicitudes = async () => {

  const { data, error } = await supabase_otro
    .from('solicitudes') // reemplaza con tu tabla
    .select('*')
    

  if (error) {
    console.error("❌ Error al mostrar la informacion:", error.message);
    return { success: false, message: error.message, data: data };
  }

  return { success: true, message: "Solicitud exitosa", data: data };
};



//Crear solicitud de cambio de contraseña
export const solicitudCambioPassword = async (cedula, password) => {
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const data_change = {new_password:hashedPassword}

  const { data, error } = await supabase_otro
    .from('solicitudes') 
     .insert([
      {
        cedula: cedula,
        tipo_solicitud: "Cambio Contraseña",
        estado_vigencia: true,
        object_change: data_change 
      },
    ]);
    

  if (error) {
    console.error("❌ Error al intentar cambiar Contraseña, intenta mas tarde:", error.message);
    return { success: false, message: error.message };
  }

  return { success: true, message: "Solicitud de Cambio de contraseña exitosa" };
};

import bcrypt from "bcryptjs";
import { supabase } from "../supabase/supabaseConfig";

export const crearUsuario = async (datos) => {
  // Encriptar la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(datos.password, 10);

  const { data, error } = await supabase.from("usuario").insert([
    {
      cedula: datos.cedula,
      nombre: datos.nombre,
      apellidos: datos.apellidos,
      fecha_nacimiento: datos.fechaNacimiento,
      sexo: datos.genero,
      telefono: datos.telefono,
      correo: datos.correo,
      direccion: datos.direccion,
      barrio: datos.barrio,
      puesto_votacion: datos.puestoVotacion,
      comuna: datos.comuna,
      password: hashedPassword, // guardar la contraseña encriptada
      // ...otros campos
    },
  ]);

  if (error) {
    console.error("❌ Error al registrar:", error.message);
    return { success: false, message: error.message , data: data};
  }

  return { success: true, message: "Usuario registrado con éxito" , data: data};
};

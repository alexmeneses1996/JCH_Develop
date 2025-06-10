import { Password } from "@mui/icons-material";
import { supabase } from "../supabase/supabaseConfig";

export const crearRegistro = async (datos,cedula_usuario) => {

  // Tu lógica para crear el usuario
  const { data, error } = await supabase
    .from("votante") // Nombre de la tabla
    .insert([
      {
        cedula: datos.cedula,
        nombre: datos.nombre,
        apellidos: datos.apellidos,
        edad: datos.edad,
        sexo: datos.sexo,
        telefono: datos.telefono,
        correo: datos.correo,
        direccion: datos.direccion,
        barrio: datos.barrio,
        puesto_votacion: datos.puestoVotacion,
        comuna: datos.comuna,
        referido: cedula_usuario,
      }, // Datos a insertar
    ]);

  if (error) {
    console.error("❌ Error al insertar:", error.message);
    return { success: false, message: error.message , data: data};
  }

  return { success: true, message: "Contacto registrado con éxito" , data: data};
};

export const retornarVotantes = async () => {
  // Tu lógica para crear el usuario
  const { data, error } = await supabase
    .from("votante") // Nombre de la tabla
    .select("*"); // Datos a insertar
  console.log(data);
};


export const validarCedulaVotante = async (cedula) => {
  const { data, error } = await supabase
    .from('votante') // reemplaza con tu tabla
    .select('cedula')
    .eq('cedula', cedula);

  return data?.length > 0;
};
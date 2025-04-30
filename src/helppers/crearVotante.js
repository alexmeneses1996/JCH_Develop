import { Password } from "@mui/icons-material";
import { supabase } from "../supabase/supabaseConfig";

export const crearRegistro = async (datos) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Tu lógica para crear el usuario
  const { data, error } = await supabase
    .from("votante") // Nombre de la tabla
    .insert([
      {
        cedula: datos.cedula,
        nombre: datos.nombre,
        apellidos: datos.apellidos,
        edad: datos.edad,
        sexo: datos.genero,
        telefono: datos.telefono,
        correo: datos.correo,
        direccion: datos.direccion,
        barrio: datos.barrio,
        puesto_votacion: datos.puestoVotacion,
        comuna: datos.comuna,
        referido: usuario,
      }, // Datos a insertar
    ]);

  if (error) {
    console.error("❌ Error al insertar:", error.message);
  } else {
    console.log("✅ Registro insertado:", data);
  }
};

export const mostrarRegistro = async () => {
  // Tu lógica para crear el usuario
  const { data, error } = await supabase
    .from("votante") // Nombre de la tabla
    .select("*"); // Datos a insertar
  console.log(data);
};

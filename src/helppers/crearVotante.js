import { supabase } from "../supabase/supabaseConfig";
import { capitalizarCadaPalabra } from "./functions";

export const crearRegistro = async (datos, cedula_usuario,link) => {

  // Tu lógica para crear el usuario
  const { data, error } = await supabase
    .from("votante") // Nombre de la tabla
    .insert([
      {
        cedula: datos.cedula,
        nombre: capitalizarCadaPalabra(datos.nombre),
        apellidos: capitalizarCadaPalabra(datos.apellidos),
        edad: datos.edad,
        fecha_de_nacimiento: datos.fecha_de_nacimiento,
        sexo: datos.sexo,
        telefono: datos.telefono,
        correo: datos.correo,
        direccion: datos.direccion,
        barrio: datos.barrio,
        puesto_votacion: datos.puesto_votacion,
        comuna: datos.comuna,
        municipio: datos.municipio,
        referido: cedula_usuario,
        nombre_completo:capitalizarCadaPalabra(datos.nombre + " " + datos.apellidos),
        link: link,
        validacion_puesto: datos.validacion_puesto,

      }, // Datos a insertar
    ]);

  if (error) {
    console.error("❌ Error al insertar:", error.message);
    return { success: false, message: error.message, data: data };
  }

  return { success: true, message: "Contacto registrado con éxito", data: data };
};

export const retornarTodosLosVotantes = async () => {
  // Tu lógica para crear el usuario
  const { data, error } = await supabase
    .from("votante")
    .select("*");

    if (error) {
    console.error("❌ Error al retornar todos los votantes:", error.message);
    return { success: false, message: error.message, data: data };
  }

  return { success: true, message: "Se retorna todos los votantes", data: data };
};


export const validarCedulaVotante = async (cedula) => {
  const { data, error } = await supabase
    .from('votante')
    .select('cedula')
    .eq('cedula', cedula);

  return data?.length > 0;
};



export const retornarVotantesPorUsuario = async (cedula) => {
  const { data, error } = await supabase
    .from("votante")
    .select("*")
    .eq('referido', cedula);
    console.log(data)

  if (error) {
    console.error("❌ Error al retornar votantes por usuario:", error.message);
    return { success: false, message: error.message, data: data };
  }

  return { success: true, message: "Se retorna los votantes por usuario", data: data };
};


export  const updateVotante = async (cedula, votanteData) => {
  const { data, error } = await supabase
    .from('votante') // Reemplaza con tu tabla
    .update(votanteData)
    .eq('cedula', cedula) // o el campo que identifique al usuario
    .select(); // opcional: para obtener el nuevo dato

  if (error) {
    console.error('Error al actualizar usuario:', error.message);
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: "Usuario Editado correctamente", data: data };
}


export const deleteVotante = async (cedula) => {
  const { data, error } = await supabase
    .from('votante')              
    .delete()                     
    .eq('cedula', cedula);        

  if (error) {
    console.error('Error al eliminar usuario:', error.message);
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: 'Usuario eliminado correctamente', data };
};






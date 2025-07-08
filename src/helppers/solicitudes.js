import { supabase } from "../supabase/supabaseConfig";
import { capitalizarCadaPalabra } from "./functions";

//Registro de eliminacion
export const registrarEliminacion = async (datos, usuario) =>{
  
    // Tu lógica para crear el usuario
  const { data, error } = await supabase
    .from("Listado_edicion_eliminacion") // Nombre de la tabla
    .insert([
      {
        cedula: datos.cedula,
        nombre: capitalizarCadaPalabra(datos.nombre),
        apellidos: capitalizarCadaPalabra(datos.apellidos),
        edad: datos.edad,
        sexo: datos.sexo,
        telefono: datos.telefono,
        correo: datos.correo,
        direccion: datos.direccion,
        barrio: datos.barrio,
        puesto_votacion: datos.puesto_votacion,
        comuna: datos.comuna,
        municipio: datos.municipio,
        nombre_completo:capitalizarCadaPalabra(datos.nombre + " " + datos.apellidos),
        accion_realizada: "ELIMINACION" ,
        responsable: usuario.cedula ,
        tipo_responsable: usuario.tipo,
        nombre_responsable: usuario.nombre_completo,
        estado: "Pendiente"
        
      }, // Datos a insertar
    ]);

  if (error) {
    console.error("❌ Error al insertar:", error.message);
    return { success: false, message: error.message, data: data };
  }

  return { success: true, message: "Contacto registrado con éxito", data: data };
}

export const modificarSolicitud = async (id,updateData) =>{
   
    const { data, error } = await supabase
    .from('Listado_edicion_eliminacion') // Reemplaza con tu tabla
    .update(updateData)
    .eq('id', id) // o el campo que identifique al usuario
    .select(); // opcional: para obtener el nuevo dato

  if (error) {
    console.error('Error al actualizar usuario:', error.message);
    return { success: false, message: error.message, data: null };
  }
console.log("hola: ",data)
  return { success: true, message: "Proceso finalizado correctamente", data: data };

}


export const retornarSolicitudes = async () =>{
  
  const { data, error }  = await supabase
    .from('Listado_edicion_eliminacion')              
    .select('*')                     

  if (error) {
    console.error("❌ Error al insertar:", error.message);
    return { success: false, message: error.message, data: data };
  }

  return { success: true, message: "informacion retornada con éxito", data: data };
}

export const retornarSolicitudesPorUser = async (id_cedula) =>{
  
  const { data, error }  = await supabase
    .from('Listado_edicion_eliminacion')              
    .select('*')
    .eq('responsable',id_cedula)                     

  if (error) {
    console.error("❌ Error al insertar:", error.message);
    return { success: false, message: error.message, data: data };
  }

  return { success: true, message: "informacion retornada con éxito", data: data };
}


export const validaSiExisteSolicitud = async (cedula) => {
  const { data, error } = await supabase
    .from('Listado_edicion_eliminacion') // reemplaza con tu tabla
    .select('*')
    .eq('cedula', cedula);///Validar los permisos de la tablaa porque debe dar error por no tener permisos

  return data?.length > 0;
};
//***********************SOLICITUDES ADMIN************************

export const registrarEliminacionAdmin = async (datos, usuario) =>{
  
    // Tu lógica para crear el usuario
  const { data, error } = await supabase
    .from("registro_eliminacion_admin") // Nombre de la tabla
    .insert([
      {
        cedula: datos.cedula,
        nombre: capitalizarCadaPalabra(datos.nombre),
        apellidos: capitalizarCadaPalabra(datos.apellidos),
        edad: datos.edad,
        sexo: datos.sexo,
        telefono: datos.telefono,
        correo: datos.correo,
        direccion: datos.direccion,
        barrio: datos.barrio,
        puesto_votacion: datos.puesto_votacion,
        comuna: datos.comuna,
        municipio: datos.municipio,
        nombre_completo:capitalizarCadaPalabra(datos.nombre + " " + datos.apellidos),
        responsable: usuario.cedula ,
        tipo_responsable: usuario.tipo,
        accion_realizada: "ELIMINACION",
      }, // Datos a insertar
    ]);

  if (error) {
    console.error("❌ Error al insertar:", error.message);
    return { success: false, message: error.message, data: data };
  }

  return { success: true, message: "Contacto registrado con éxito", data: data };
}


//SELECT
export const retornarSolicitudesAdmin = async () =>{
  
  const { data, error }  = await supabase
    .from('registro_eliminacion_admin')              
    .select('*')                     

  if (error) {
    console.error("❌ Error al insertar:", error.message);
    return { success: false, message: error.message, data: data };
  }

  return { success: true, message: "informacion retornada con éxito", data: data };
}



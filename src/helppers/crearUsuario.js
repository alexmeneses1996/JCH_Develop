import bcrypt from "bcryptjs";
import { supabase } from "../supabase/supabaseConfig";
import { calcularEdad, capitalizarCadaPalabra } from "./functions";

//*******************Funcion de creacion de usuario*********************//
export const registrarUsuarioAuth = async (datos, password) => {
  const cedulaLimpia = datos.cedula.toString().trim().replace(/\s+/g, '');

  const correoOculto = `usuario_${cedulaLimpia}@jcreamoshistoria.com`; // genera correo oculto

  // 1. Registrar usuario en Supabase Auth
  const { data: signUpData, error: errorSignUp } = await supabase.auth.signUp({
    email: correoOculto,
    password,
  });

  if (errorSignUp) {
    console.error('Error de Supabase Auth:', errorSignUp);
    return { success: false, message: errorSignUp.message };
  }

  const user_id = signUpData.user.id;

  // 2. Guardar en la tabla usuario
  const { error: errorInsert } = await supabase.from('usuario').insert([
    {
      correo_oculto: correoOculto,
      user_id: user_id,
      cedula: datos.cedula,
      nombre: capitalizarCadaPalabra(datos.nombre),
      apellidos: capitalizarCadaPalabra(datos.apellidos),
      edad: calcularEdad(datos.fecha_de_nacimiento),
      fecha_de_nacimiento: datos.fecha_de_nacimiento,
      sexo: datos.sexo,
      telefono: datos.telefono,
      correo: datos.correo,
      direccion: datos.direccion,
      barrio: datos.barrio,
      puesto_votacion: datos.puesto_votacion,
      comuna: datos.comuna,
      nombre_completo: capitalizarCadaPalabra(datos.nombre +" "+ datos.apellidos),
      municipio: datos.municipio,
      tipo:'User',
      validacion_puesto: datos.validacion_puesto
    },
  ]);

  if (errorInsert) {
    console.log(`Usuario creado, pero error guardando información adicional: ${errorInsert.message}`)
    return { success: false, message: errorInsert.message };

  } else {
    return { success: true, message: "Usuario registrado con éxito" };
  }
};

//*******************Funcion de retornar usuarios*********************//
export const retornarUsuarios = async () => {
  // Tu lógica para crear el usuario
  const { data, error } = await supabase
    .from("usuario") // Nombre de la tabla
    .select("*"); // Datos a insertar

  if (error) {
    console.error("❌ Error al retornar los usuarios:", error.message);
    return { success: false, message: error.message, data: data };
  }

  return { success: true, message: "Retornado los usuarios con Exito", data: data };

};

//*******************Funcion de Validar usuario*********************//
export const validarCedulaUsuario = async (cedula) => {
  const { data, error } = await supabase
    .from('usuario') // reemplaza con tu tabla
    .select('*')
    .eq('cedula', cedula);///Validar los permisos de la tablaa porque debe dar error por no tener permisos


  return data?.length > 0;
};

//*******************Funcion de devolver usuario*********************//
export const devolverUsuario = async (cedula) => {
  const { data, error } = await supabase
    .from('usuario') // reemplaza con tu tabla
    .select('*')
    .eq('cedula', cedula).single();

  if (error) {
    console.error("❌ Error al retornar el usuario:", error.message);
    return { success: false, message: error.message, data: data };
  }

  return { success: true, message: "Retornando el usuario con exito", data: data };
};


//*******************Funcion Login usuario*********************//
export const loginUsuarioAuth = async (cedula, password) => {
  //const correoOculto = `usuario_${cedula}@jcreamoshistoria.com`;
  const correoOculto = `usuario_${cedula}@jcreamoshistoria.com`

  const { data, error } = await supabase.auth.signInWithPassword({
    email: correoOculto,
    password: password,
  });

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: "Registro exitoso", data: data };
};

//*******************Funcion de validar sesion de usuario*********************//
export const userActivo = async (tipo) => {
  const { data, error } = await supabase.auth.getUser(); // o .getSession()
  if (!error) {

    const correo = data.user.email
    const tipo = correo.split('_')[0]
    const cedula = correo.split('_')[1].split('@')[0];
    console.log(tipo)
    let result = {}
    if(tipo == "admin")   result = await devolverUsuarioAdmin(cedula)
      else result = await devolverUsuario(cedula)
    console.log(data.user.email)
    console.log(result)

    
  return { success: true, message: "Registro exitoso", data: result.data };
  } else {
    return { success: false, message: error.message, data: null };
  }
}
//*******************Funcion de cerrar sesion de usuario*********************//
export const cerrarSesion = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { success: false, message: error.message};

  } else {
    return { success: true, message: "Sesión cerrada exitosamente"};
  }
};


//*******************Funcion de inicio de sesion de usuario Admin *********************//
export const loginUsuarioAuthAdmin = async (cedula, password) =>{
    //const correoOculto = `usuario_${cedula}@jcreamoshistoria.com`;
  const correoOculto = `admin_${cedula}@jcreamoshistoria.com`

  const { data, error } = await supabase.auth.signInWithPassword({
    email: correoOculto,
    password: password,
  });

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: "Registro exitoso", data: data };
}

//*******************Funcion de devolver usuario Admin*********************//
export const devolverUsuarioAdmin = async (cedula) => {
  const { data, error } = await supabase
    .from('administrator') // de la tabla de administradores
    .select('*')
    .eq('cedula', cedula).single();

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: "Se encontró el usuario", data: data };
};



//*******************Funcion de actualizar usuario*********************//
export  const updateUser = async (cedula, userData) => {
  const { data, error } = await supabase
    .from('usuario') // Reemplaza con tu tabla
    .update(userData)
    .eq('cedula', cedula) // o el campo que identifique al usuario
    .select(); // opcional: para obtener el nuevo dato

  if (error) {
    console.error('Error al actualizar usuario:', error.message);
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: "Usuario Editado correctamente", data: data };
}

//*******************Funcion de actualizar contraseña de usuario*********************//
export const actualizarContrasena = async (nuevaClave) => {
  const { error } = await supabase.auth.updateUser({
    password: nuevaClave,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Contraseña actualizada exitosamente." };
};
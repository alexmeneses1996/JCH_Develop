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
      edad: datos.edad,
      sexo: datos.sexo,
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
    return { success: false, message: error.message, data: data };
  }

  return { success: true, message: "Usuario registrado con éxito", data: data };
};


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

export const validarCedulaUsuario = async (cedula) => {
  const { data, error } = await supabase
    .from('usuario') // reemplaza con tu tabla
    .select('cedula')
    .eq('cedula', cedula);

  return data?.length > 0;
};

export const devolverUsuario = async (cedula) => {
  const { data, error } = await supabase
    .from('usuario_info') // reemplaza con tu tabla
    .select('*')
    .eq('cedula', cedula).single();

  return data;
};



export const registrarUsuarioAuth = async (datos, password) => {
  const cedulaLimpia = datos.cedula.toString().trim().replace(/\s+/g, '');

  const correoOculto = `usuario_${cedulaLimpia}@example.com`; // genera correo oculto
  console.log(datos.cedula)
  console.log(correoOculto)

  // 1. Registrar usuario en Supabase Auth
  const { data: signUpData, error: errorSignUp } = await supabase.auth.signUp({
    email: correoOculto,
    password,
  });

  if (errorSignUp) {
    console.error('Error de Supabase Auth:', errorSignUp);
    //setMensaje(`Error al registrar usuario: ${errorSignUp.message}`);
    return { success: false, message: errorSignUp.message };
  }

  const user_id = signUpData.user.id;

  // 2. Guardar en la tabla usuarios_info
  const { error: errorInsert } = await supabase.from('usuarios_info').insert([
    {
      correo_oculto: correoOculto,
      user_id: user_id,
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
    },
  ]);

  if (errorInsert) {
    //setMensaje(`Usuario creado, pero error guardando información adicional: ${errorInsert.message}`);
    console.log(`Usuario creado, pero error guardando información adicional: ${errorInsert.message}`)
    return { success: false, message: errorInsert.message };

  } else {
    return { success: true, message: "Usuario registrado con éxito" };

    //setMensaje('¡Usuario registrado exitosamente!');
    // Opcional: limpia el formulario
    //setDocumento('');
    //setTelefono('');
    //setCorreoReal('');
    //setPassword('');
  }
};


export const loginUsuarioAuth = async (cedula, password) => {
  //const correoOculto = `usuario_${cedula}@jcreamoshistoria.com`;
  const correoOculto = `usuario_${cedula}@example.com`

  const { data, error } = await supabase.auth.signInWithPassword({
    email: correoOculto,
    password: password,
  });

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: "Registro exitoso", data: data };
};


export const userActivo = async () => {

  const { data, error } = await supabase.auth.getUser(); // o .getSession()
  if (!error) {

    const correo = data.user.email
    const cedula = correo.split('_')[1].split('@')[0];
    const usuario = await devolverUsuario(cedula)
    console.log(data.user.email)
    console.log(usuario)

    
  return { success: true, message: "Registro exitoso", data: usuario };
  } else {
    return { success: false, message: error.message, data: null };
  }
}

export const cerrarSesion = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { success: false, message: error.message};

  } else {
    return { success: true, message: "Sesión cerrada exitosamente"};
  }
};

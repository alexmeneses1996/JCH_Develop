import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const Private = ({autenticacion, children, setAutenticacion}) => {

      useEffect(() => {
        const validarUsuario = () =>{
  
        const cedula = JSON.parse(localStorage.getItem('usuario'));
  
        if(cedula) setAutenticacion(true)
          else setAutenticacion(false)
  
  
        }
        validarUsuario()
      }, [])

  return  autenticacion ? children : <Navigate to='/login'></Navigate>
}

export default Private
import React from 'react'
import { Navigate } from 'react-router-dom'

const Private = ({autenticacion, children}) => {
  return  autenticacion ? children : <Navigate to='/login'></Navigate>
}

export default Private
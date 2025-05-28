import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const Private = ({autenticacion, children, setAutenticacion}) => {

  return  autenticacion ? children : <Navigate to='/login'></Navigate>
}

export default Private
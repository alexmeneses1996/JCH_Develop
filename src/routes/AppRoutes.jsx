import { CircularProgress, GlobalStyles } from '@mui/material'
import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
//import Login from '../components/Login'
//import Home from '../components/Home'
//import Available from './Available'
//import RegistroUser from '../components/RegistroUser'

import Private from './Private'
import Navbar from '../components/Navbar'
import { userActivo } from '../helppers/crearUsuario'
import { AppContext } from '../context/userContext'


const RegistroUser = lazy(() => import('../components/RegistroUser'))
const Available = lazy(() => import('./Available'))
const Login = lazy(() => import('../components/Login'))
const Home = lazy(() => import('../components/Home'))
const OlvideMiClave = lazy(() => import('../components/OlvideMiClave'))
const ResetPassword = lazy(() => import('../components/ResetPassword'))
const FormCreationBylink = lazy(() => import('../components/FormCreationBylink'))



const AppRoutes = () => {



  const routeSinNavbar = ["/login", "/registrar", "/reset-password"]
  const location = useLocation()
  const navegate = useNavigate()
  const [autenticacion, setAutenticacion] = useState()
  const { context, setContext } = useContext(AppContext)


  useEffect(() => {

    const obtenerUsuario = async () => {

      const result = await userActivo()
      if (result.success) {
        setContext(result.data)
        console.log(result.data)
        setAutenticacion(true)
        navegate('/')
      }


    }
    obtenerUsuario()

  }, [])




  return (
    <>
      <GlobalStyles
        styles={{
          'input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #F0F0F0 inset !important',
            WebkitTextFillColor: '#000',
            transition: 'background-color 5000s ease-in-out 0s',
            borderRadius: '20px !important', // Previene parpadeo
          },
          'input:-webkit-autofill:focus': {
            WebkitBoxShadow: '0 0 0 1000px #F0F0F0 inset !important',
            borderRadius: '20px !important',
          },
        }}
      />

      {!(routeSinNavbar.includes(location.pathname) || location.pathname.startsWith("/nuevoRegistroLink/")) && <Navbar setAutenticacion={setAutenticacion} />}
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          {/* Rutas Públicas */}
          <Route path='/login' element={<Login setAutenticacion={setAutenticacion} />} />
          <Route path='/registrar' element={<RegistroUser />} />
          <Route path='/olvide-mi-clave' element={<OlvideMiClave />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/nuevoRegistroLink/:id_cedula' element={<FormCreationBylink />} />
          <Route path='/' element={<Home />} />


          {/* Rutas Privadas */}
          <Route path="/*" element={
            <Private autenticacion={autenticacion} setAutenticacion={setAutenticacion}>
              <Available user={context} setAutenticacion={setAutenticacion} />
            </Private>
          } />

        </Routes>
      </Suspense>

    </>
  )
}

export default AppRoutes
import { CircularProgress, GlobalStyles } from '@mui/material'
import React, { Suspense, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from '../components/Login'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import Available from './Available'
import Private from './Private'

const AppRoutes = () => {

    const routeSinNavbar = ["/login"]
    const location = useLocation()
    const [autenticacion, setAutenticacion] = useState()

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

      {!location.pathname.includes(routeSinNavbar) && <Navbar  />}
    <Suspense fallback={<CircularProgress />}>
        <Routes>
          {/* Rutas Públicas */}
            <Route path='/login' element={<Login setAutenticacion={setAutenticacion} />}/>
            <Route path='/' element={<Home />}/>

          {/* Rutas Privadas */}
          <Route path="/*" element={
            <Private autenticacion={autenticacion}>
              <Available />
            </Private>
          }/>

        </Routes>
    </Suspense>
    
    </>
  )
}

export default AppRoutes
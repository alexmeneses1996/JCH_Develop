import { CircularProgress, GlobalStyles } from '@mui/material'
import React, { Suspense, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from '../components/Login'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import Inicio from '../components/Inicio'
import Graphics from '../components/Graphics'
import FormCreation from '../components/FormCreation'

const AppRoutes = () => {

    const routeSinNavbar = ["/login"]
    const location = useLocation()
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
            <Route path='/login' element={<Login />}/>
            <Route path='/' element={<Home />}/>
            <Route path='/inicio' element={<Inicio />}/>
            <Route path='/nuevoRegistro' element={<FormCreation />}/>
            <Route path='/graficos' element={<Graphics />}/>


        </Routes>
    </Suspense>
    
    </>
  )
}

export default AppRoutes
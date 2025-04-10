import { CircularProgress } from '@mui/material'
import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Home from '../components/Home'

const AppRoutes = () => {
  return (
    <>
    <Suspense fallback={<CircularProgress />}>
        <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/' element={<Home />}/>
        </Routes>
    </Suspense>
    
    </>
  )
}

export default AppRoutes
import { CircularProgress } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Inicio = lazy(() => import('../components/Inicio'))
const FormCreation = lazy(()=> import('../components/FormCreation'))
const Graphics = lazy(()=> import('../components/Graphics'))

const Available = () => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <Routes>
                <Route path='/inicio' element={<Inicio />} />
                <Route path='/nuevoRegistro' element={<FormCreation />} />
                <Route path='/graficos' element={<Graphics />} />
            </Routes>
        </Suspense>)
}

export default Available
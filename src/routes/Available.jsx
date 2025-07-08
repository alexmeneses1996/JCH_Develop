import { CircularProgress } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Inicio = lazy(() => import('../components/Inicio'))
const FormCreation = lazy(()=> import('../components/FormCreation'))
const Graphics = lazy(()=> import('../components/Graphics'))
const EditUser = lazy(()=> import('../components/EditUser'))
const PerfilUser= lazy(()=> import('../components/PerfilUser'))
const AdminSolicitudes= lazy(()=> import('../components/AdminSolicitudes'))


const Available = ({user, setAutenticacion}) => {
    return (
        <Suspense fallback={<CircularProgress />}>
            <Routes>
                <Route path='/inicio' element={<Inicio />} />
                <Route path='/nuevoRegistro' element={<FormCreation />} />
                <Route path='/graficos' element={<Graphics />} />
                <Route path='/solicitudes' element={<AdminSolicitudes />} />
                <Route path='/editar_perfil' element={<EditUser user={user}/>} />
                <Route path='/perfil' element={<PerfilUser user={user} setAutenticacion={setAutenticacion}/>} />
            </Routes>
        </Suspense>)
}

export default Available
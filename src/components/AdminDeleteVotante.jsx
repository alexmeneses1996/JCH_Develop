import { Delete } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { deleteVotante, registrarEliminacion } from '../helppers/crearVotante';

const AdminDeleteVotante = ({votante, usuario}) => {

  const [openSession, setOpenSession] = useState(false);
  const handleOpenSession = () =>  setOpenSession(true)
  const handleCloseSession = () => setOpenSession(false)

  const handleCerrarSesion = async () => {
    handleCloseSession()
    const result = await deleteVotante(votante.cedula)
    if(result.success) {
        const res = await registrarEliminacion(votante,usuario)
        if(res.success) alert("✅ " + result.message)
        else alert("❌ Error al intentar registrar la eliminacion del votante")
    }
       
    else alert("❌ Error al intentar eliminar votante")
  };

    return (
        <>
            <IconButton><Delete color="error"  onClick={handleOpenSession}/></IconButton>

            <Dialog open={openSession} onClose={handleCloseSession}>
                <DialogTitle>¿Eliminar Votante?</DialogTitle>
                <DialogContent>
                    ¿Estás seguro de que deseas eliminar el votante con cedula: {votante.cedula}? Se eliminará por completo y <strong>NO</strong> podrás revertirlo.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSession} color="primary">
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleCerrarSesion}
                        color="error"
                    >
                        Eliminar Votante
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default AdminDeleteVotante
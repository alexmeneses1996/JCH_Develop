import { Delete } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React, { useState } from 'react'

const AdminDeleteVotante = ({cedula}) => {

  const [openSession, setOpenSession] = useState(false);
  const handleOpenSession = () =>  setOpenSession(true)
  const handleCloseSession = () => setOpenSession(false)

  const handleCerrarSesion = () => {
    handleCloseSession()
    alert("Se eliminó")
  };

    return (
        <>
            <IconButton><Delete color="error"  onClick={handleOpenSession}/></IconButton>

            <Dialog open={openSession} onClose={handleCloseSession}>
                <DialogTitle>¿Eliminar Votante?</DialogTitle>
                <DialogContent>
                    ¿Estás seguro de que deseas eliminar el votante con cedula: {cedula}? Se eliminará por completo y <strong>NO</strong> podrás revertirlo.
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
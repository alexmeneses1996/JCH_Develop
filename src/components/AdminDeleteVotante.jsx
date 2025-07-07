import { Delete } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { deleteVotante } from '../helppers/crearVotante';
import { registrarEliminacion, registrarEliminacionAdmin, validaSiExisteSolicitud } from '../helppers/solicitudes';

const AdminDeleteVotante = ({ votante, usuario }) => {

    const [openSession, setOpenSession] = useState(false);
    const handleOpenSession = () => setOpenSession(true)
    const handleCloseSession = () => setOpenSession(false)

    const handleCerrarSesion = async () => {
        handleCloseSession()

        //Se crea la solicitud para realizar la eliminacion si el tipo de usuario es user o admin.
        if (usuario.tipo === "Admin") {
            const result = await deleteVotante(votante.cedula)
            if (result.success) {
                const res = await registrarEliminacionAdmin(votante, usuario)
                if (res.success) alert("✅ Se realizó exitosamente la eliminacion del votante")
                else alert("❌ Error al intentar registrar la eliminacion del votante")
            }
            else alert("❌ Error al intentar eliminar votante")
        }
        else {

            //Se valida que no se haya realizado ya una solicitud de eliminacion
            const res = await validaSiExisteSolicitud(votante.cedula)
            if (res) { alert("Tienes una solicitud de eliminacion en proceso")}
            else {
                //Si es user -> se registra la eliminacion
                const result = await registrarEliminacion(votante, usuario)
                if (result.success) alert("✅ " + result.message)
                else alert("❌ Error al intentar registrar la eliminacion del votante")
            }

        }


    };

    return (
        <>
            <IconButton><Delete color="error" onClick={handleOpenSession} /></IconButton>

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
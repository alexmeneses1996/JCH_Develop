import React, { useContext, useState } from 'react'
import { Box, FormControl, IconButton, Modal, TextField, Typography } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
import { Visibility } from '@mui/icons-material';
import { colorViewVotante } from '../styled/styled';
import { AppContext } from '../context/userContext';
import QRConWhatsapp from './QrConWhatsapp';


const UserCreationByLink = ({ handleClose }) => {

    const { context, setContext } = useContext(AppContext)
    const [open, setOpen] = useState(false);
    const handleOpenWindow = () => setOpen(true);
    const handleCloseWindow = () => {setOpen(false), handleClose() };


    const handleSubmitAdmin = async (event) => {
        //event.preventDefault();
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 640,
        bgcolor: 'background.paper',
        border: '2px solid #efe7da',
        boxShadow: 24,
        borderRadius: 4,
        p: 1,
        margin: '5px'
    };

    return (
        <>
            <Typography onClick={handleOpenWindow}>Formulario de Referido</Typography>

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        onSubmit={handleSubmitAdmin}
                    >
                        <IconButton onClick={handleCloseWindow} sx={{ position: "absolute", top: 8, left: 8, "&:hover": { color: 'red' } }}>
                            <CancelIcon />
                        </IconButton>

                        <Typography sx={{
                            display: 'flex', alignItems: "center",
                            justifyContent: "center", fontSize: "40px", fontWeight: "bold", color: '#0b5345',
                        }}> Escanea el código QR</Typography>
                        <Typography sx={{
                            display: 'flex', alignItems: "center",
                            justifyContent: "center", fontSize: "20px", fontWeight: "bold", color: '#0b5345',
                        }}> Formulario de registro de Referido</Typography>

                        <Box sx={{ display: 'flex' }}>
                            <QRConWhatsapp id_cedula={context.cedula} />
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default UserCreationByLink

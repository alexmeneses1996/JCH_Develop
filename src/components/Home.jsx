import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import React from 'react'
import Footer from './Footer'


const Home = () => {
    return (


        <Container
            maxWidth={false}
            disableGutters
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgb( 248, 249, 250)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '0px',
                margin: '0px'
            }}
        >
 

            <Box sx={{ width: '100%', backgroundColor: '#fff' }}>
                <img
                    src="/imagen.jpg"
                    alt="Descripción de la imagen"
                    style={{ width: '80%', height: 'auto' }}
                />
            </Box>

            <Box display='flex' sx={{ width: '100%' }}>
                <Box sx={{ width: '100%', padding: '0 1rem' }}>
                    <Typography> VISION: </Typography>
                    <Typography>Ser líderes en innovación social, transformando comunidades con soluciones sostenibles y colaborativas. </Typography>

                </Box>
                <Box sx={{ width: '100%', padding: '0 1rem' }}>
                    <Typography> MISION: </Typography>
                    <Typography > Impulsar el desarrollo comunitario mediante proyectos participativos que promuevan la equidad, la educación y el bienestar social. </Typography>


                </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
                Redes sociales
      
            </Box>
            <Footer />
        </Container>


    )
}

export default Home
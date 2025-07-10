import { Box, Button, Container, IconButton, Typography } from '@mui/material'
import React from 'react'
import Footer from './Footer'
import { color_fondo_home } from '../styled/styled'
import CarruselSlick from './CarruselSlick'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from 'react-router-dom'



const Home = () => {
    const navigate = useNavigate()
    const phoneNumber = "+573174990966" //3214567890"; // Reemplaza con tu número
    const message = "Hola, me gustaría saber más acerca de juntos creamos historia";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    const clik = () =>{
        navigate("/nuevoRegistroLink/444")
    }
    return (


        <Container
            maxWidth={false}
            disableGutters
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: color_fondo_home,//'rgb( 248, 249, 250)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '0px',
                margin: '0px'
            }}
        >


            <Box sx={{ width: '100%', backgroundColor: color_fondo_home, mt: '70px' }}>
                {/* <img
                    src="/imagen.jpg"
                    alt="Descripción de la imagen"
                    style={{ width: '80%',backgroundColor: color_fondo_home }}
                />*/}
                {/* Sección 1 */}
                <Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Juntos Creamos Historia
                    </Typography>
                    <Typography>
                        Transformando nuestras comunidades a través de la participación activa de los jóvenes.
                    </Typography>
                </Box>
                <CarruselSlick />
            </Box>

            <Box display='flex'>
                <Box sx={{ width: '100%', padding: '0 1rem', backgroundColor: color_fondo_home }}>
                    <Typography> VISION: </Typography>
                    <Typography>Ser líderes en innovación social, transformando comunidades con soluciones sostenibles y colaborativas. </Typography>

                </Box>
                <Box sx={{ width: '100%', padding: '0 1rem', backgroundColor: color_fondo_home }}>
                    <Typography> MISION: </Typography>
                    <Typography > Impulsar el desarrollo comunitario mediante proyectos participativos que promuevan la equidad, la educación y el bienestar social. </Typography>


                </Box>
            </Box>

            <Footer />

            {/* Botón de WhatsApp */}
            <IconButton
                component="a"
                href={whatsappLink}
                target="_blank"
                sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    backgroundColor: "#25D366",
                    color: "white",
                    "&:hover": { backgroundColor: "#128C7E" },
                    p: 1.5,
                    borderRadius: "50%",
                    boxShadow: 3,
                }}
            >
                <WhatsAppIcon fontSize="large" />
            </IconButton>
            <Button onClick={clik}> da clik prueba</Button>
        </Container>


    )
}

export default Home
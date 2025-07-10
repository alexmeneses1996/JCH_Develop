import { Box, Card, CardContent, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import { bg_boton } from '../styled/styled'

const AdminEstadistico = () => {
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgb( 248, 249, 250)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                paddingTop: "64px",
                margin: "0px",
            }}
        >
            <Card elevation={3} sx={{ position: 'relative' }}>
                <CardContent>

                    <Typography
                        sx={{ color: bg_boton }}
                        variant="h5"
                        gutterBottom
                        fontWeight="bold"
                    >
                        Informacion
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    <Box>

                    </Box>
                </CardContent>
            </Card>

        </Container>

    )
}

export default AdminEstadistico
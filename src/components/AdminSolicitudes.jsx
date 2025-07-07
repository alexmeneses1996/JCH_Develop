import { Box, Button, Chip, Container, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import AdminVerificarSolicitud from './AdminVerificarSolicitud';
import { retornarSolicitudes } from '../helppers/solicitudes';

const AdminSolicitudes = () => {
    const statusColors = {
        Aprobado: 'success',
        Pendiente: 'warning',
        Rechazado: 'error',
    };

    const [filtered, setFiltered] = useState([]);
    const [datos, setDatos] = useState(null)
    const [busqueda, setBusqueda] = useState('');
    const [responsable, setResponsable] = useState('');
    const [estado, setEstado] = useState('');
    const [page, setPage] = useState(0);
    const navigate = useNavigate()
    const rowsPerPage = 5;
    const { context, setContext } = useContext(AppContext)


    //consultando la base de datos para extraer la informacion
    useEffect(() => {
        const fetchDatos = async () => {
            const result = await retornarSolicitudes()
            setDatos(result.data);
            setFiltered(result.data)
            console.log(result.data)
        };

        fetchDatos();
    }, []);



    useEffect(() => {

        let result = datos?.filter(dato =>
            //Se realiza busqueda por escritura (Nombre)
            (busqueda ? dato.responsable?.toLowerCase().includes(busqueda.toLowerCase()) : true) &&
            (estado ? dato.estado === estado : true) &&
            //filtro por 
            (responsable ? dato.responsable === responsable : true)
        );
        setFiltered(result);
    }, [busqueda, responsable, estado]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };



    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgb( 248, 249, 250)',///1e3a8a
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '64px',
                margin: '0px'
            }}>
            <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
                <Box sx={{
                    flexGrow: 1,
                    backgroundColor: 'white',
                    color: 'white',
                    p: 2,
                    overflowY: 'auto',
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" sx={{ color: '#1e3a8a', fontWeight: 'bold' }}>Solicitudes</Typography>
                        <Box>
                        </Box>
                    </Box>

                    {/* Filtros */}
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            label="Buscar..."
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <Select
                            value={estado}
                            displayEmpty
                            size="small"
                            onChange={(e) => setEstado(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="">Todos los estados</MenuItem>
                            {[...new Set(datos?.map(r => r.estado))].sort((a, b) => Number(a) - Number(b)).map(p => (
                                <MenuItem key={p} value={p}>{p}</MenuItem>
                            ))}
                        </Select>
                        <Select
                            value={responsable}
                            displayEmpty
                            size="small"
                            onChange={(e) => setResponsable(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value="">Todos los responsables</MenuItem>
                            {[...new Set(datos?.map(r => r.responsable))].map(c => (
                                <MenuItem key={c} value={c}>{c}</MenuItem>
                            ))}
                        </Select>
                        <Button onClick={() => { setBusqueda(''); setResponsable(''); setEstado(''); }} variant="outlined">Limpiar</Button>
                    </Box>

                    {/* Tabla */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Tipo Responsable</TableCell>
                                    <TableCell>Responsable</TableCell>
                                    <TableCell>Accion Realizada</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Creado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filtered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((r, i) => (
                                        <TableRow key={r.id}>
                                            <TableCell >{i + 1 + page * rowsPerPage}</TableCell>
                                            <TableCell >{r.tipo_responsable}</TableCell>
                                            <TableCell >{r.responsable}</TableCell>
                                            <TableCell >{r.accion_realizada}</TableCell>
                                            <TableCell >
                                                <Chip label={r.estado} color={statusColors[r.estado] || 'default'} size="small" />
                                            </TableCell>
                                            <TableCell>{r.creado}</TableCell>
                                            <TableCell>
                                                <AdminVerificarSolicitud votante={datos[0]} setFiltered={setFiltered} setDatos={setDatos} setBusqueda={setBusqueda}
                                                setResponsable={setResponsable} setEstado={setEstado} estado={r.estado}/>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            component="div"
                            count={filtered?.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOptions={[rowsPerPage]}
                        />
                    </TableContainer>
                </Box>
            </Box>
        </Container>
    )
}

export default AdminSolicitudes
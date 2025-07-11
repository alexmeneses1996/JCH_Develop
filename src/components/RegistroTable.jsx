import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, MenuItem, Select, TextField, TablePagination,
  FormControlLabel,
  Checkbox,
  Switch
} from '@mui/material';
import { CloudDownload, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { bg_boton } from '../styled/styled';
import { AppContext } from '../context/userContext';
import AdminEditVotante from './AdminEditVotante';
import AdminViewVotante from './AdminViewVotante';
import AdminDeleteVotante from './AdminDeleteVotante';
import { exportToExcel, ordenarComuna } from '../helppers/functions';


const RegistrosTable = ({ datos, filtered, setFiltered }) => {

  const [registros, setRegistros] = useState([]);
  //const [datos, setDatos] = useState(null)
  const [busqueda, setBusqueda] = useState('');
  const [busquedaId, setBusquedaId] = useState('');
  const [buscarPorCedula, setBuscarPorCedula] = useState(false);
  const [comuna, setComuna] = useState('');
  const [edad, setEdad] = useState('');
  const [page, setPage] = useState(0);
  const navigate = useNavigate()
  const rowsPerPage = 5;
  const { context, setContext } = useContext(AppContext)



  useEffect(() => {

    let result = datos?.filter(dato =>
      //Se realiza busqueda por escritura (Nombre)
      (busqueda
        ? buscarPorCedula
          ? dato.cedula?.toString().includes(busqueda)
          : dato.nombre_completo?.toLowerCase().includes(busqueda.toLowerCase())
        : true
      ) &&
      (edad ? Number(dato.edad) === Number(edad) : true) &&
      (comuna ? dato.comuna === comuna : true)
    );
    setFiltered(result);
  }, [busqueda, comuna, edad]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const hanldeExportData = () => {
    exportToExcel(filtered, "votantes.xlsx")
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{display:'flex',gap: 4,}}> <Typography variant="h6" sx={{ color: '#1e3a8a', fontWeight: 'bold' }}>Mis Registros</Typography>
          <FormControlLabel
            sx={{ display: 'flex', color: 'black' }}
            control={
              <Switch
                checked={buscarPorCedula}
                onChange={() => setBuscarPorCedula(!buscarPorCedula)}
                name="buscarPorCedula"
                sx={{ color: bg_boton }}
              />
            }
            label="Buscar por Documento"

          /></Box>
        <Box>

          <Button startIcon={<CloudDownload />} variant="outlined" sx={{ mr: 1, backgroundColor: "#90d8b2" }} onClick={hanldeExportData}>Exportar</Button>
          {context.tipo != "Admin" && (<Button sx={{ backgroundColor: bg_boton }} startIcon={<Add />} variant="contained" onClick={() => { navigate("/nuevoRegistro") }}>Nuevo Registro</Button>)}
        </Box>
      </Box>

      {/* Filtros */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>

        <TextField
          label={buscarPorCedula? "Buscar por Documento...":"Buscar por Nombre..."}
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <Select
          value={edad}
          displayEmpty
          size="small"
          onChange={(e) => setEdad(e.target.value)}
          fullWidth
        >
          <MenuItem value="">Todos las edades</MenuItem>
          {[...new Set(datos?.map(r => r.edad))].sort((a, b) => Number(a) - Number(b)).map(p => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </Select>
        <Select
          value={comuna}
          displayEmpty
          size="small"
          onChange={(e) => setComuna(e.target.value)}
          fullWidth
        >
          <MenuItem value="">Todos las comunas</MenuItem>
          {[...new Set(datos?.map(r => r.comuna))].map(c => (
            <MenuItem key={c} value={c}>{c}</MenuItem>
          ))}
        </Select>
        <Button onClick={() => { setBusqueda(''); setComuna(''); setEdad(''); }} variant="outlined">Limpiar</Button>
      </Box>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Edad</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Comuna</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((r, i) => (
                <TableRow key={r.cedula}>
                  <TableCell >{i + 1 + page * rowsPerPage}</TableCell>
                  <TableCell >{r.nombre_completo}</TableCell>
                  <TableCell >{r.cedula}</TableCell>
                  <TableCell >{r.edad}</TableCell>
                  <TableCell>{r.sexo}</TableCell>
                  <TableCell >{r.comuna}</TableCell>

                  <TableCell>
                    <AdminViewVotante key={r.referido} votante={r} />
                    <AdminEditVotante key={r.cedula} votante={r} />
                    <AdminDeleteVotante votante={r} usuario={context} />
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
  );
};

export default RegistrosTable;

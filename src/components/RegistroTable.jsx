import React, { useEffect, useState } from 'react';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Typography, MenuItem, Select, TextField, IconButton,
  Chip, TablePagination
} from '@mui/material';
import { Edit, Delete, Visibility, CloudDownload, Add } from '@mui/icons-material';
import axios from 'axios';
import { supabase } from '../supabase/supabaseConfig';

const statusColors = {
  Activo: 'success',
  Verificado: 'info',
  Pendiente: 'warning',
  Cancelado: 'error',
};

const RegistrosTable = () => {

  const [registros, setRegistros] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [datos, setDatos] = useState(null)
  const [busqueda, setBusqueda] = useState('');
  const [pais, setPais] = useState('');
  const [estatus, setEstatus] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  useEffect(() => {
    //fetchRegistros();
    retornarVotantes();
  }, []);

  /*const fetchRegistros = async () => {
    const { data, error } = await supabase.from('registros').select('*');
    if (error) console.error(error);
    else {
      setRegistros(data);
      setFiltered(data);
    }
  };*/

 const fetchRegistros = async () => {
    
   await axios.get('http://localhost:4000/registros')
      .then(res => setRegistros(res.data))
      .catch(err => console.error(err));
  }

  const retornarVotantes = async () =>{
    const cedula_referido = JSON.parse(localStorage.getItem('usuario'))
    const {data, error} = await supabase
    .from("votante")
    .select("*")
    //.eq("referido",cedula_referido)

    setDatos(data)
    console.log(datos)
  }



  useEffect(() => {
    console.log(datos)
    let result = registros.filter(r =>
      r.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (pais ? r.pais === pais : true) &&
      (estatus ? r.estatus === estatus : true)
    );
    setFiltered(result);
  }, [busqueda, pais, estatus, registros]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ color: '#1e3a8a', fontWeight: 'bold' }}>Mis Registros</Typography>
        <Box>
          <Button startIcon={<CloudDownload />} variant="outlined" sx={{ mr: 1 }}>Exportar</Button>
          <Button startIcon={<Add />} variant="contained">Nuevo Registro</Button>
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
          value={pais}
          displayEmpty
          size="small"
          onChange={(e) => setPais(e.target.value)}
          fullWidth
        >
          <MenuItem value="">Todos los países</MenuItem>
          {[...new Set(registros.map(r => r.pais))].map(p => (
            <MenuItem key={p} value={p}>{p}</MenuItem>
          ))}
        </Select>
        <Select
          value={estatus}
          displayEmpty
          size="small"
          onChange={(e) => setEstatus(e.target.value)}
          fullWidth
        >
          <MenuItem value="">Todos los estatus</MenuItem>
          {Object.keys(statusColors).map(status => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
        <Button onClick={() => { setBusqueda(''); setPais(''); setEstatus(''); }} variant="outlined">Limpiar</Button>
      </Box>

      {/* Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>País</TableCell>
              <TableCell>Estatus</TableCell>
              <TableCell>Fecha Registro</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((r, i) => (
              <TableRow key={r.id}>
                <TableCell>{i + 1 + page * rowsPerPage}</TableCell>
                <TableCell>{r.nombre}</TableCell>
                <TableCell>{r.documento}</TableCell>
                <TableCell>{r.pais}</TableCell>
                <TableCell>
                  <Chip label={r.estatus} color={statusColors[r.estatus] || 'default'} size="small" />
                </TableCell>
                <TableCell>{new Date(r.fecha_registro).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton><Visibility color="primary" /></IconButton>
                  <IconButton><Edit color="info" /></IconButton>
                  <IconButton><Delete color="error" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filtered.length}
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

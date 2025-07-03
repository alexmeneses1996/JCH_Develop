import React, { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '../supabase/supabaseConfig';
import { Container } from '@mui/material';
import { AppContext } from '../context/userContext';
import {  retornarTodosLosVotantes, retornarVotantesPorUsuario } from '../helppers/crearVotante';
import { ordenarComuna } from '../helppers/functions';

const Graphics = () => {
  const [data, setData] = useState([]);
  const {context, setContext} = useContext(AppContext)

  // Consultar datos desde Supabase
  useEffect(() => {
    const fetchData = async () => {
       let result;

      if(context.tipo == "Admin") result = await retornarTodosLosVotantes()
        else result = await retornarVotantesPorUsuario(context.cedula)

      if (result.success) {
        setData(result.data);
      } else {
        alert(result.message)
      }
    };

    fetchData();
  }, []);

  // Agrupadores para contar elementos por clave
  const countByField = (field) => {
    const counts = {};
    data.forEach((item) => {
      const key = item[field];
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([key, value]) => ({ name: key, cantidad: value }));
  };

  const sexoData = countByField('sexo');
  const comunaDataRaw = countByField('comuna');
  const barrioData = countByField('barrio');
  const edadesData = countByField('edad');

  /*data.map((item) => ({
    name: `${item.nombre} ${item.apellidos}`,
    edad: item.edad,
  }));*/

  const comunaData = ordenarComuna(comunaDataRaw)
   /*[...comunaDataRaw].sort((a, b) => {
  const numeroA = parseInt(a.name.toLowerCase().replace('comuna ', ''), 10);
  const numeroB = parseInt(b.name.toLowerCase().replace('comuna ', ''), 10);
  return numeroA - numeroB;
});*/




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
      }}>

      <div className="graphics-container" style={{ padding: '1rem' }}>
        <h2>Gráficas de Votantes</h2>
        <h3>Cantidad: {data?.length}</h3>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Gráfico de Sexo */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <h4>Distribución por Sexo</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sexoData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="cantidad" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Edades (como histograma) */}
          <div style={{ flex: 1, minWidth: 600 }}>
            <h4>Distribución por Edad</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={edadesData}>
                <XAxis dataKey="name" label={{ value: 'Edad', position: 'insideBottom', offset: -5 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="cantidad" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Edad 
        <div style={{ flex: 1, minWidth: 300 }}>
          <h4>Edades</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={edadesData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-30} />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="edad" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>*/}
        </div>

        {/* Gráfico de Comunas 
        <div style={{ marginTop: '2rem' }}>
          <h4>Distribución por Comuna</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comunaData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="cantidad" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>*/}
        <div style={{ marginTop: '2rem' }}>
          <h4>Distribución por Comuna</h4>
        <ResponsiveContainer width="100%"  height={Math.max(comunaData.length * 40, 250)}>
          <BarChart
            data={comunaData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="cantidad" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
        </div>

        {/* Gráfico de Barrios */}
        <div style={{ marginTop: '2rem' }}>
          <h4>Distribución por Barrio</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barrioData}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-30} />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="cantidad" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </Container>

  );
};

export default Graphics;

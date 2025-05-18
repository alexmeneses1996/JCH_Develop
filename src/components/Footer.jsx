import { Box, Typography, IconButton, Grid } from '@mui/material';
import { Email, Phone, Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#0b5345', color: 'white', py: 5, px: 2, width:'100%'}}>
      <Box mx="auto" display="flex" flexDirection="column" gap={4}>
        {/* Sección 1 */}
        <Box>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Juntos Creamos Historia
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Transformando nuestras comunidades a través de la participación activa de los jóvenes.
          </Typography>
        </Box>

        {/* Sección 2 */}
        <Box display="flex" flexDirection="column" justifyContent='center'  alignItems= 'center'>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Contacto
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center', mb: 1 }}>
            <Email sx={{ fontSize: 18, mr: 1 }} /> juntoscreamoshistoria@gmail.com
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center' }}>
            <Phone sx={{ fontSize: 18, mr: 1 }} /> +57 321 456 7890
          </Typography>
        </Box>

        {/* Sección 3 */}
        <Box display="flex" flexDirection="column" justifyContent='center'  alignItems= 'center'>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Síguenos
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton color="inherit" onClick={()=>{window.open('https://www.instagram.com/jcreamoshistoria?igsh=bHQ0NDFteW54bjc4','_blank')}}>
              <Instagram />
            </IconButton>
          </Box>
        </Box>

        {/* Línea final */}
        <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid #1e40af', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            &copy; 2025 Juntos Creamos Historia. Todos los derechos reservados.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};


export default Footer
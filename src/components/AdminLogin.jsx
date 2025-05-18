import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  TextField,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CancelIcon from '@mui/icons-material/Cancel'
import { useNavigate } from 'react-router-dom'
//import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
//import { saveUser } from '../redux/slices/currentUser'

const AdminLogin = ({setAutenticacion}) => {
  const navegate = useNavigate()
  //const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #efe7da',
    boxShadow: 24,
    borderRadius: 4,
    p: 4
  }

  const usuarioReferencia = {
    cedula: '1143',
    password: 'admin123'
  }

  const formik = useFormik({
    initialValues: {
      cedulaAdmin: '',
      passwordAdmin: '',
      showPassword: false
    },
    validationSchema: yup.object({
      cedulaAdmin: yup
        .string()
        .required('La Cedula es obligatoria'),
      passwordAdmin: yup
        .string()
        .min(6, 'Mínimo 6 caracteres')
        .required('La contraseña es obligatoria')
    }),
    onSubmit: (values, { setErrors }) => {
      //Validacion de correo electronico
      if (values.cedulaAdmin !== usuarioReferencia.cedula) {
        setErrors({ cedulaAdmin: 'La cedula no está registrada' })
        return
      }
      //Validacion de contraseña
      if (values.passwordAdmin !== usuarioReferencia.password) {
        setErrors({ passwordAdmin: 'Contraseña incorrecta' })
        return
      }

     /*dispatch(
       saveUser({
          email: values.emailAdmin,
          displayName: 'Administrador',
          role: 'Administrador'
        })
      ) */
      setAutenticacion(true)
      navegate('/inicio')
    }
  })

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ '&:hover': { color: '#00A78E' } }}>
        <AdminPanelSettingsIcon />
      </IconButton>

      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onSubmit={formik.handleSubmit}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                ':hover': { color: 'red' }
              }}
            >
              <CancelIcon />
            </IconButton>

            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                fontWeight: 'bold'
              }}
            >
              Ingreso Admin
            </Typography>

            <FormControl
              sx={{
                m: 1,
                width: '250px',
                backgroundColor: '#efe7da',
                borderRadius: '10px'
              }}
              variant='filled'
            >
              <TextField
                label='cedula'
                id='cedulaAdmin'
                value={formik.values.cedula}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.cedulaAdmin && Boolean(formik.errors.cedulaAdmin)
                }
                helperText={
                  formik.touched.cedulaAdmin && formik.errors.cedulaAdmin
                }
                variant='filled'
                sx={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  '& .MuiFilledInput-root': {
                    borderRadius: '10px',
                    backgroundColor: '#efe7da' 
                  }
                }}
              />
            </FormControl>
            <FormControl
              sx={{
                m: 1,
                width: '250px',
                backgroundColor: '#efe7da',
                borderRadius: '10px'
              }}
              variant='filled'
            >
              <InputLabel htmlFor='filled-adornment-passwordAdmin'>
                Contraseña
              </InputLabel>
              <FilledInput
                id='filled-adornment-passwordAdmin'
                name='passwordAdmin'
                type={formik.values.showPassword ? 'text' : 'password'}
                value={formik.values.passwordAdmin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.passwordAdmin &&
                  Boolean(formik.errors.passwordAdmin)
                }
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() =>
                        formik.setFieldValue(
                          'showPassword',
                          !formik.values.showPassword
                        )
                      }
                      edge='end'
                    >
                      {!formik.values.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                variant='filled'
                sx={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  '& .MuiFilledInput-root': {
                    borderRadius: '10px',
                    backgroundColor: '#efe7da' // Asegura que el color de fondo coincida
                  }
                }}
              />
              {formik.touched.passwordAdmin && formik.errors.passwordAdmin && (
                <FormHelperText error>
                  {formik.errors.passwordAdmin}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              type='submit'
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#00BFA5',
                borderRadius: '30px',
                border: '0',
                width: '250px',
                height: '44px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                color: 'white',
                ':hover': { backgroundColor: '#00A78E' }
              }}
            >
              Ingresar
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default AdminLogin
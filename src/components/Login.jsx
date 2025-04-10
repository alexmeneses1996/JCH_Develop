import { Box, Button, Container, FilledInput, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'


const Login = () => {

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          showPassword: false
        },
        validationSchema: yup.object({
          email: yup
            .string()
            .email('Correo invalido')
            .required('El correo es obligatorio'),
          password: yup
            .string()
            .min(6, 'Mínimo 6 caracteres')
            .required('La contraseña es obligatoria')
        }),
        onSubmit: async (values, { setErrors }) => {
    /*
          //Validacion de correo electronico si existe
          const isRegistred = await validarEmail({ email: values.email })
          if (!isRegistred) {
            setErrors({ email: ' El email no se encuentra registrado.' })
            return
          }
    
          //Se realiza el proceso de ingreso con contraseña y correo
          await emailLogin({ email: values.email, password: values.password}).then(response => {
    
            //Validar si el usuario no es null,
            if(!response){
              setErrors({ password: 'Contraseña incorrecta.' })
              return
            }else{
    
              dispatch(
                saveUser({
                 ...response,
                  role: 'user'
                })
              )
              //setAutentication(true)
              //navegate('/')
            }
          
          }
          )
          */
        }
      })
    
    return (
        <>
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#efe7da',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0px',
                margin: '0px'
            }}
        >
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onSubmit={formik.handleSubmit}
          >
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                fontWeight: 'bold',
                marginBottom: '20px'
              }}
            >
              INGRESO
            </Typography>
            <FormControl
              sx={{
                m: 1,
                width: '250px',
                backgroundColor: '#aee3fe',
                borderRadius: '40px'
              }}
              variant='filled'
            >
              <TextField
                label='Usuario'
                id='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant='filled'
                sx={{
                  borderRadius: '40px',
                  overflow: 'hidden',
                  '& .MuiFilledInput-root': {
                    borderRadius: '40px',
                    backgroundColor: '#aee3fe' // Asegura que el color de fondo coincida
                  }
                }}
              />
            </FormControl>
            <FormControl
              sx={{
                m: 1,
                width: '250px',
                backgroundColor: '#aee3fe',
                borderRadius: '40px'
              }}
              variant='filled'
            >
              <InputLabel htmlFor='filled-adornment-password'>
                Contraseña
              </InputLabel>
              <FilledInput
                id='filled-adornment-password'
                name='password'
                type={formik.values.showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
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
                  borderRadius: '40px',
                  overflow: 'hidden',
                  '& .MuiFilledInput-root': {
                    borderRadius: '40px',
                    backgroundColor: '#aee3fe' // Asegura que el color de fondo coincida
                  }
                }}
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText error>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>
            <Button
              variant='text'
              sx={{
                width: '10',
                display: 'flex',
                alignItems: 'center',
                color: 'black',
                justifyContent: 'center',
                marginTop: '4px',
                textTransform: 'none',
                ':hover': { backgroundColor: 'white', color: '#00A78E' }
              }}
            >
              ¿Olvidaste tu contraseña?
            </Button>

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
        </Container>
        </>
    )
}

export default Login
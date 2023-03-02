import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
//import PropTypes from 'prop-types'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'

import useField from './useField'
import { loginUser } from '../reducers/userReducer'
import { errorMessage, message } from '../reducers/notificationReducer'
import NewUser from './NewUser'


const LoginForm = () => {
  const [newUserVisible, setNewUserVisible] = useState(false)

  const dispatch = useDispatch()
  
  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  
  const onLogin = async (event) => {
    event.preventDefault()

    resetUsername()
    resetPassword()

    dispatch(loginUser(username.value, password.value))
    .then(() => {
      dispatch(message('User ' + username.value + ' just logged in'))
    })
    .catch(error => {
      console.error('Login failed: ', error.message)
      if(error.response.status === 401) {
        dispatch(errorMessage('Wrong username or password!'))
      } else {
        dispatch(errorMessage('Error in login, check your network connection! Error:' + error.message))
      }
    })
  }

  const showLogin = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ textAlign: 'center' }} variant='h4'>
            Blog App
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{textAlign: 'left', margin: '10px'}} variant='h5'>
              Login
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
         <form onSubmit={onLogin}>
           <Grid item xs={12}>
             <Grid container spacing={2}>
               <Grid item xs={12}>
                  <TextField fullWidth id='username' label='Username' variant='outlined' size='small' {...username} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth id='password' label='Password' variant='outlined' size='small' {...password} />
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{marginTop: 4}}>
                <Button fullWidth  id='login-button' type='submit' variant='contained'>
                  Login
                </Button>
              </Grid> 
            </Grid>
          </form>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={9} sx={{marginTop: 10}}>
            <Typography sx={{textAlign: 'left'}} variant='h6'>
              Do not have an account?
            </Typography>
          </Grid>
          <Grid item xs={5}>
              <Button fullWidth variant='contained' color='primary' onClick={() => setNewUserVisible(true)}>Create account</Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const showNewUser = () => {
    return (  
      <div>
        <NewUser />
      </div>
    )
  }

  return(
    <Container sx={{ flexGrow: 1 }} maxWidth='xs'>
      {newUserVisible ? showNewUser() : showLogin()}  
    </Container>
  )
}

export default LoginForm

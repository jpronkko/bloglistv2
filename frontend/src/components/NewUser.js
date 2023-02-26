import React from 'react'
import { useDispatch } from 'react-redux'
//import PropTypes from 'prop-types'
import { Button, TextField, Typography } from '@mui/material'
import useField from './useField'
import { loginUser, createUser } from '../reducers/userReducer'
import { errorMessage, message } from '../reducers/notificationReducer'
import { initUserInfo } from '../reducers/userInfoReducer'

const NewUser = () => {
  const dispatch = useDispatch()

  const { reset: resetName, ...newName } = useField('text')
  const { reset: resetNewUsername, ...newUsername } = useField('text')
  const { reset: resetNewUserPassword, ...newUserPassword } = useField('password')
  
  const onCreate = async (event) => {
    event.preventDefault()

    resetName()
    resetNewUsername()
    resetNewUserPassword()
    
    dispatch(createUser(newName.value, newUsername.value, newUserPassword.value))
    .then(() => login(newUsername.value, newUserPassword.value))
    .catch(error => {
      if(error.response.status === 400) {
        dispatch(errorMessage('Can not create user. User name and password lenght should be three letters or more.'))
      } else {
        console.error('Create user failed with error', error)
        dispatch(errorMessage('Create user failed with error ' + error.message))
      }
    })
  }
  
  const login = (username, password) => {
    dispatch(loginUser(username, password))
    .then(() => {
      dispatch(message('Created and logged in user: ' + username))
      dispatch(initUserInfo())
    })
    .catch(error => {
      console.error('Can not log in the new user: ', error.message)
      dispatch(errorMessage('Error in login, check your network connection! Error:' + error.message))
    })
  }

  return(
    <div>
      <Typography variant='h3'>New Account</Typography>
    
      <form onSubmit={onCreate}>
        <div style={{marginTop: 1}}>
          <TextField label='Name' variant='filled'  {...newName} />
        </div> 
        <div style={{marginTop: 1}}>
          <TextField label='Username' variant='filled'  {...newUsername} />
        </div>
        <div style={{marginTop: 1}}>
          <TextField label='Password' variant='filled' {...newUserPassword} />
        </div>
        <div style={{marginTop: 10}}>
          <Button id='create-user-button' variant='contained' type='submit'>create</Button>
        </div>
      </form>

    </div>

  )
}

export default NewUser
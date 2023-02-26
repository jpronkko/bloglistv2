import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

const UserStatus = ({children}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logoutUser())
    console.log('Logout!')
  }

  const userInfo = () => {
    if(user) {
      return(
        <div style={{margin: 5}}>
          {user.name} has logged in. &nbsp;
          <Button type='button' variant='outlined' color='inherit' onClick={handleLogout}>Logout</Button> 
        </div>
      )}
    else {
      return "Please log in"
    }
  }

  return(
    <AppBar position='static'>
      <Toolbar>
        <Button id='home_button' color='inherit' component={Link} to='/'>
          Home
        </Button>
        <Button color='inherit' component={Link} to='/users'>
          Users
        </Button>
        <Typography variant='subtitle2'>
          {userInfo()} 
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  )
}

export default UserStatus
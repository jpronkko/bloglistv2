import React from 'react'
import { useSelector } from 'react-redux'
import { Alert, AlertTitle } from '@mui/material'

const Notification = () => {
  const notification = useSelector( state => state.notification )

  if(notification.notification) {
    if(notification.isError) {
      return (
        <Alert id='notification' severity='error'>
          <AlertTitle>Error</AlertTitle>
          {notification.notification}
        </Alert>
      )
    } else {
      return (
        <Alert id='notification' severity='info'>
          {notification.notification}
        </Alert>
      )
    }
  } else {
    return null
  }
}

//Notification.displayName = 'Notification'
export default Notification
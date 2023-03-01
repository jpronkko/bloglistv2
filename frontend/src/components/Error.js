import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'

const Error = ({msg}) => {

  const navigate = useNavigate()
  return (
    <div>
      <Typography variant='body2'>
        The item you are looking for can not be found! Message: {msg}
      </Typography>
      <Button variant='contained' onClick={() => navigate('/')}>Go home</Button>
    </div>
  )
}

export default Error
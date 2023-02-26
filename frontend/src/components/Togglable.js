import React, { useState, useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisbile = { display: visible ? 'none' : '', marginTop: 10, marginBottom: 20 }
  const hideWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return(
    <div>
      <div style={showWhenVisbile}>
        <Button id='show_toggle' variant='contained' color='primary' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={hideWhenVisible}>
        {props.children}
        <Button variant='contained' color='primary' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
export default Togglable
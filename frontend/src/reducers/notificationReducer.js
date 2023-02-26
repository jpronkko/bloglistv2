const msgDuration = 10

export const errorMessage = (error) => {
  return setNotification(error, true, msgDuration)
}

export const message = (message) => {
  return setNotification(message, false, msgDuration)
}

export const setNotification = (notification, isError, duration) => {
  let timeoutID = null
  
  return async dispatch => {
    dispatch({ type: 'MESSAGE', data: { notification, isError }})
    if(timeoutID) {
      dispatch({ type: 'CLEAR_MESSAGE' })
      timeoutID = null
    }

    timeoutID = setTimeout(() => {
      dispatch({ type: 'CLEAR_MESSAGE' })
      timeoutID = null
    }, duration * 1000)
  }
}

const notificationReducer = (state = 'ALKU', action) => {
  //console.log(`Notification: State ${JSON.stringify(state)}, action ${JSON.stringify(action)}`)

  switch(action.type) {
    case 'MESSAGE':
      return action.data
    case 'CLEAR_MESSAGE':
      return ''
    default:
      return state
  }
}

export default notificationReducer
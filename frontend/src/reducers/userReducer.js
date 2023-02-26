import userService from '../services/user'
import blogService from '../services/blogs'


export const initUser = () => {
  return async dispatch => {
    const loggedBlogAppUser = 
      window.localStorage.getItem('loggedBlogAppUser')

    if(loggedBlogAppUser) {
        const user = JSON.parse(loggedBlogAppUser)
     
        blogService.setToken(user.token)
        dispatch({ type: 'INIT_USER', data: user })
    }
  } 
}

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await userService.login(username, password)
    blogService.setToken(user.token)
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify(user)
    )

    dispatch({ type: 'LOGIN', data: user })
  }
} 

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch({ type: 'LOGOUT' })
  }
}

export const createUser = (name, username, password) => {
  return async dispatch => {
    const user = await userService.createUser(name, username, password)
    dispatch({ type: 'CREATE_USER', data: user })
  }
}

const userReducer = (state = null, action) => {
  //console.log(`User: State ${JSON.stringify(state)}, action ${JSON.stringify(action)}`)
  switch(action.type) {
    case 'INIT_USER':
      return action.data
    case 'LOGIN':
      return action.data
    case 'CREATE_USER':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export default userReducer
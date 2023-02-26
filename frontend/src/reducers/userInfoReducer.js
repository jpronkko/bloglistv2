import userService from '../services/user'

export const initUserInfo = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({ type: 'INIT_USER_INFO', data: users})
  }
}

const userReducer = (state =  [], action) => {
  //console.log(`UserInfo: State ${JSON.stringify(state)}, action ${JSON.stringify(action)}`)
  switch(action.type) {
    case 'INIT_USER_INFO':
      return action.data
    default:
      return state
  }
}

export default userReducer
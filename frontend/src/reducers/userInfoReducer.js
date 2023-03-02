import userService from '../services/user'

export const initUserInfo = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({ type: 'INIT_USER_INFO', data: users})
  }
}

export const addUserBlog = (userId, blog) =>  {
  return dispatch => {
    dispatch({ type: 'ADD_USER_BLOG', data: {userId, blog} })
  }
}

export const deleteUserBlog = (userId, blogId) => {
  return dispatch => {
    dispatch({ type: 'DELETE_USER_BLOG', data: {userId, blogId, paskaa: "pöorinää"} })
  }
}

const userInfoReducer = (state = [], action) => {
  //console.log(`UserInfo: State ${JSON.stringify(state)}, action ${JSON.stringify(action)}`)
  switch(action.type) {
    case 'INIT_USER_INFO':
      return action.data

    case 'ADD_USER_BLOG':
      let userToAddBlog = state.find(user => user.id === action.data.userId)
      userToAddBlog.blogs = [...userToAddBlog.blogs, action.data.blog]
      return state.map(user => user.id === action.data.userId ?
        userToAddBlog :
        user)

    case 'DELETE_USER_BLOG':
      console.log('DELETE_USER_BLOG')
      console.log(action.data)
      let userToDeleteBlog = state.find(user => user.id === action.data.userId)
      console.log('Before userto',userToDeleteBlog)
      
      userToDeleteBlog.blogs = userToDeleteBlog.blogs.filter(blog => blog && blog.id !== action.data.blogId) 
      console.log('After', userToDeleteBlog)

      return state.map(user => user.id === action.data.userId ?
        userToDeleteBlog :
        user)
  
    default:
      return state
  }
}

export default userInfoReducer
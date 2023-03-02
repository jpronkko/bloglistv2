import blogService from '../services/blogs'

export const initBlogs = () => {
  return async dispatch => {
    //const blogs = await blogService.getAll()
    const blogs = await blogService.getAllWithUserIds()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.create(newBlog)
    dispatch({
      type: 'CREATE_BLOG',
      data: blog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    const blogResp = await blogService.deleteBlog(blog)
    console.log("Delete blog response ", blogResp)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

export const addLikeToBlog = (blog) => {
  return async dispatch => { 
    const updatedBlog = await blogService.addLikes(blog)
    dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
    })
  }
}

export const addCommentToBlog = (blog, text, userid) => {
  return async dispatch => {
    const comment = { text,  userid } 
    const updatedBlog = await blogService.addComment(blog, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

const blogReducer = (state = [], action) => {
  //console.log(`Blog: State ${JSON.stringify(state)}, action ${JSON.stringify(action)}`)
  
  const blog = action.data

  switch(action.type) {
    case 'CREATE_BLOG':
      return [...state, blog]

    case 'INIT_BLOGS':
      return blog

    case 'UPDATE_BLOG':
      return state.map(x => x.id === blog.id ? blog : x)

    case 'DELETE_BLOG':
      return state.filter(x => x.id !== blog.id)  
    
    default:
      return state
  }
}

export default blogReducer

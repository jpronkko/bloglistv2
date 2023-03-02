import axios from 'axios'
import { baseUrl } from '../util/config'
const blogsUrl =  baseUrl + '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(blogsUrl)
  return response.data
}

const getAllWithUserIds = async () => {
  const response = await axios.get(blogsUrl + '/all')
  return response.data
}

const getConfig = () => {
  return { headers: { Authorization: token } }
}


const create = async newObject => {
  const config = getConfig()
  const response = await axios.post(blogsUrl, newObject, config)
  return response.data
}

const addLikes = async (blog) => {
  const config = getConfig()
  const response = await axios.put(`${blogsUrl}/addlike/${blog.id}`, blog, config)
  return response.data
}

const addComment = async (blog, comment) => {
  const config = getConfig()
  const response = await axios.put(`${blogsUrl}/addcomment/${blog.id}`, comment, config)
  return response.data
}

const deleteBlog = async (blogToDelete) => {
  const config = getConfig()
  const response = await axios.delete(`${blogsUrl}/${blogToDelete.id}`, config)
  return response
}

export default { 
  getAll, 
  getAllWithUserIds, 
  //getBlogsForUser, 
  create, 
  deleteBlog, 
  addLikes, 
  addComment,
  setToken,
 } 
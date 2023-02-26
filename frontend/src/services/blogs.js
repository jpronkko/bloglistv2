import axios from 'axios'
import { baseUrl } from '../util/config'
const blogsUrl =  baseUrl + '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  console.log("Network: Trying to fetch all blogs from ", blogsUrl)
  const response = await axios.get(blogsUrl)
  console.log("Network: Got response: ", response.data)
  return response.data
}

const getAllWithUserIds = async () => {
  console.log("Network: Trying to fetch all blogs from ", blogsUrl)
  const response = await axios.get(blogsUrl + '/all')
  console.log("Network: Got response: ", response.data)
  return response.data
}

const getConfig = () => {
  return { headers: { Authorization: token } }
}

/*const getBlogsForUser = async () => {
  const config = getConfig()
  const response = await axios.get(`${blogsForUserUrl}`, config)
  console.log(response.data)
  return response.data
}*/

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
  return response.data
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
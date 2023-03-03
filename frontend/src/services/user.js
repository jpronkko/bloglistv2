import axios from 'axios'
import { baseUrl } from '../util/config'

const loginUrl = baseUrl + '/api/login'
const userUrl = baseUrl + '/api/users'

const login = async (username, password) => {
  const response = await axios.post(loginUrl, { username, password })
  return response.data
}

const createUser = async (name, username, password) => {
  const response = await axios.post(userUrl, { name, username, password })
  return response.data
}

const getAll = async () => {
  const response = await axios.get(userUrl)
  return response.data
}

 const userService = { 
  login, 
  createUser, 
  getAll 
}

export default userService
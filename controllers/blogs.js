//const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

/*const getToken = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}*/

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/all', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

async function findUser(request, response)  {
  const decodedToken = request.decodedToken
  if(!decodedToken) {
    logger.error('User token missing or invalid')
    return { 
      error: response
        .status(401)
        .json({ error: 'token missing or invalid' }) 
    }
  }

  const user = await User.findById(decodedToken.id)
  if(!user) {
    logger.error(`User with id ${decodedToken.id} not found!`)
    return { error: response.status(404).json({ error: 'no such user found' }) }
  }
 
  logger.info('User found:', user)
  return { user }
}

blogsRouter.get('/userblogs/', async (request, response) => {
  const userFound = await findUser(request, response)
  if(!userFound.user) {
    return userFound.error
  }
  const user = userFound.user
  return response.status(200).json(user.blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  //logger.error(blog)

  if(blog)
    response.json(blog.toJSON())
  else
    response.status(404).end()
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const userFound = await findUser(request, response)
  if(!userFound.user) {
    return userFound.error
  }
  const user = userFound.user

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  
  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
  //response.status(201).json(result)
})


const hasUserABlog = (user, request, response) => {
  //logger.error('USER ', user)
  const blogId = request.params.id
  logger.error('user has blogs:', user.blogs)
  if(!user.blogs.includes(blogId)) {
    return { 
      error: response
        .status(404)
        .json({ error: 'no such blog for user found' }) }
  } 

  return { blogId: blogId }
}


blogsRouter.delete('/:id', async (request, response) => {
 
  const userFound = await findUser(request, response)
  if(!userFound.user) {
    return userFound.error
  }
  const user = userFound.user

  const blogFound = hasUserABlog(user, request, response)
  if(!blogFound.blogId) {
    return blogFound.error
  }
  const idToDelete = blogFound.blogId
  user.blogs = user.blogs.filter(x => x._id !== idToDelete)
  //logger.info('Id to del', idToDelete)
  const result = await Blog.findByIdAndRemove(idToDelete)
  response.status(204).json(result)
})


blogsRouter.put('/addlike/:id', async (request, response) => {
  // Check if it is a real user
  const userFound = await findUser(request, response)
  if(!userFound.user) {
    logger.error("User is not found!")
    return userFound.error
  }

  //const user = userFound.user

  const id = request.params.id
  const blog = await Blog.findById(id)
 
  if(!blog) {
    logger.error(`No blog with id: ${id}`)
    response.status(404).end()
  }

  const update = {
    likes: blog.likes + 1,
  }

  const blogId = request.params.id
  const result = await Blog.findByIdAndUpdate(blogId, update, { new: true })
  logger.info('res:' + result)
  response.status(200).json(result)
})

blogsRouter.put('/addcomment/:id', async (request, response) => {
 
  const userFound = await findUser(request, response)
  if(!userFound.user) {
    return userFound.error
  }
  const user = userFound.user

  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if(!blog) {
    response.status(404).end()
  }

  const body = request.body
  
  const newComment = { text: body.text, postedBy: user._id } 
  
  const update = { 
    comments: blog.comments ? 
      [ ...blog.comments, newComment ] : 
      [ newComment ]
  }
  
  const result = await Blog.findByIdAndUpdate(blogId, update, { new: true })
  response.status(200).json(result)
})

module.exports = blogsRouter
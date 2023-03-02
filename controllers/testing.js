const testRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const logger = require('../utils/logger')

testRouter.post('/reset', async (request, response) => {
  logger.info('Reset received, deleting users and blogs from db.')
  await User.deleteMany({})
  await Blog.deleteMany({})

  response.status(204).end()
})

testRouter.put('/blogmodify/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)

  if(!blog) {
    logger.error(`No blog with id: ${id}`)
    response.status(404).end()
  }
  const body = request.body

  const updatedBlog = {
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  const result = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true })
  logger.info('update:' + JSON.stringify(updatedBlog))
  logger.info('res:' + result)
  response.status(200).json(result)
})
module.exports = testRouter
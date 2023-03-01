const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.static('build'))

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.requestToken)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)

if(process.env.NODE_ENV === 'test') {
  const testRouter = require('./controllers/testing')
  app.use('/api/testing', testRouter)
}

app.get('/health', (req, res) => {
  //throw 'Health error!'
  // eslint-disable-next-line no-unreachable
  res.send('ok')
})

app.use('*', express.static('build'))
//app.use('/error', express.static('build'))
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
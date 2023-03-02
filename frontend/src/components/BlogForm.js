import React from 'react'
//import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField } from '@mui/material'

import { errorMessage, message } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { addUserBlog } from '../reducers/userInfoReducer'
import useField from './useField'

const BlogForm = () => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')
  const userId = useSelector(state => state.user.id)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()
  
  const onCreate = async (event) => {
    event.preventDefault()

    resetTitle()
    resetAuthor()
    resetUrl()

    const newBlog = { title: title.value, author: author.value, url: url.value, likes: 0 }
    dispatch(createBlog(newBlog))
    .then(() => {
      dispatch(message(`A new blog "${title.value}" by ${author.value} added`))
      const blog = blogs.find(blog => blog.user === userId && blog.title === title.value)
      if (blog)
        dispatch(addUserBlog(userId, blog))
    })
    .catch(error => {
        dispatch(errorMessage('Create blog failed, ' + error.message))
        console.error('Create blog failed:', error.message)}
    )
  }

  return(
    <form onSubmit={onCreate}>
      <div style={{marginTop: 1}}>
        <TextField id='title' label='Title' variant='filled' {...title}/>
      </div>
      <div style={{marginTop: 1}}>
        <TextField id='author' label='Author' variant='filled' {...author} />
      </div>
      <div style={{marginTop: 1}}>
        <TextField id='url' label='Url' variant='filled' {...url} />
      </div>
      <div style={{marginTop: 10, marginBottom: 5}}>
        <Button id='submit_blog' type='submit' variant='contained' color='primary'>create</Button>
      </div>
    </form>
  )
}

export default BlogForm

import React from 'react'
//import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Button, TextField } from '@mui/material'

import { errorMessage, message } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import useField from './useField'

const BlogForm = () => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const dispatch = useDispatch()
  
  const onCreate = async (event) => {
    event.preventDefault()

    resetTitle()
    resetAuthor()
    resetUrl()

    dispatch(createBlog({ title: title.value, author: author.value, url: url.value, likes: 0 }))
    .then(() => dispatch(message(`A new blog "${title.value}" by ${author.value} added`)))
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

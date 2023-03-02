import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useMatch } from 'react-router-dom'
import { Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import User from './components/User'
import UserStatus from './components/UserStatus'
import UserList from './components/UserList'

import { initUser } from './reducers/userReducer'
import { initUserInfo } from './reducers/userInfoReducer'
import { errorMessage, message } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'

const theme = createTheme()

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const allUsers = useSelector(state => state.userInfo)

  const allBlogs = useSelector(
    state => state.blogs.sort((a, b) => b.likes - a.likes) 
  )

  const blogPathMatch = useMatch('/blogs/:id')
  const matchedBlog = blogPathMatch ? allBlogs.find(blog => blog.id === blogPathMatch.params.id) : null
  
  const userPathMatch = useMatch('/users/:id')
  const matchedUser = userPathMatch ? allUsers.find(x => x.id === userPathMatch.params.id) : null 
  
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
    .then(() => dispatch(message('All blogs loaded!')))
    .catch(error => dispatch(errorMessage(error.message)))
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
    .then(() => dispatch(initUserInfo()))
    .catch(error => dispatch(errorMessage(error.message)))
  }, [dispatch])

  useEffect(() =>  {
    console.log("allUsers")
    console.log(allUsers)
    console.log("allBlogs")
    console.log(allBlogs)
  }, [allUsers, allBlogs])
  const loginForm = () => {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    )
  }

  const Home = () => {
    return (
      <div style={{margin: '20px'}}>
        <Togglable id="new_blog" buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm  />
        </Togglable>
      
        <BlogList title={'All blogs'} blogs={allBlogs} />
      </div>
    )
  }

  const routerConstruct = () => {
    return (
      <div>
        <UserStatus />
        <Notification />
        <Routes>     
          <Route path="/users" element={<UserList />} />

          <Route path="/blogs/:id" element={
             matchedBlog ? <Blog blog={matchedBlog} /> :
             <Error msg={`No blog found with id ${matchedBlog?.id}.`}/> 
            } 
          />  
          
          <Route path="/users/:id" element={
            matchedUser ? <User user={matchedUser} /> :
            <Error msg={`No user found with id ${matchedUser?.id}.`}/> 
          }
          />

          <Route path="/error" element={<Error msg="Just error!" />} />
        
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error msg="No route found!"/>}/>
        </Routes>
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div>
          {!user ? loginForm() : routerConstruct()}
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default App
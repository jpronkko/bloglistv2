import React from 'react'
import BlogList from './BlogList'
import { useSelector } from 'react-redux'

const User = ({user}) => {
  const userBlogs = useSelector(state => state.blogs.filter(x => x.user === user.id))

  return (
    <div>
      <BlogList title={user.name + ' added blogs:'} blogs={userBlogs} />      
    </div>
  )
}

export default User

      
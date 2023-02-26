import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { 
  Card, 
  CardActions, 
  CardContent, 
  Link,
  Paper,
  TableContainer,
  Table, 
  TableBody, 
  TableRow,
  TableCell, 
  Typography, 
} from '@mui/material' 


const BlogList = ({title, blogs}) => {

  const cell = (blog) => {
    return(
      <Card sx={{minWidth: 275}}>
        <CardContent>
        <Typography variant='h5'>
         {blog.title}
        </Typography>
        <Typography sx={{marginBottom: 1}} color="textSecondary">
        {blog.author}
        </Typography>
        </CardContent>
        <CardActions>
          <Link id="maximize" size='small' component={RouterLink} to={`/blogs/${blog.id}`}>Learn more</Link>
        </CardActions>
      </Card>
    )
  } 

  return(
   <div style={{padding: 5, margin: 1}}>
      <Typography variant='h4'>
        {title}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableBody id='blog-list'>
            {blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                 {cell(blog)}
                </TableCell>
              </TableRow>
          ))}
          </TableBody>
          </Table>
      </TableContainer>
      </div>
  )
}

//  <Link component={RouterLink} to={`/blogs/${blog.id}`} key={blog.id}>{blog.title}</Link>
export default BlogList
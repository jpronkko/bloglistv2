import React from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import {
  Link, 
  Paper,
  TableContainer,
  Table, 
  TableBody, 
  TableRow,
  TableCell, 
  TableHead,
  Typography
} from '@mui/material'

const UserList = () => {
  const users = useSelector(state => state.userInfo)

  return(
    <div id='user-list'>
      
      <Typography variant='h5' sx={{margin: '15px'}}>
        Users
      </Typography>

      <TableContainer component={Paper}>
        <Table>
            <TableHead>
              <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs</TableCell>
              </TableRow>
            </TableHead>
          <TableBody>
          {users.map(user => 
           <TableRow key={user.id}>
               <TableCell>
                 <Link component={RouterLink} to={`/users/${user.id}`}>{user.name}</Link> 
                </TableCell>
               <TableCell>
                 {user.blogs.length}
                </TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
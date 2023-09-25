import { Alert } from '@mui/material'
import React from 'react'

const Error = ({errorMessage}) => {
  return (
    <Alert severity="error" style={{marginTop:50, width:400}}>{errorMessage}</Alert>
  )
}

export default Error
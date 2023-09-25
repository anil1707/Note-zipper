import { Box, CircularProgress } from '@mui/material';
import React from 'react'
import '../styles/Loading.css'
const Loading = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
  
}

export default Loading
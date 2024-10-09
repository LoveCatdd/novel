import { Box } from '@mui/material'
import React from 'react'

export const NotFound = () => {
  return (
    <Box sx={{
            display: 'flex', 
            justifyContent: 'center', 
            // alignContent: 'center', 
            color: 'white', 
            fontSize: '36px',
            height: '2000px',
            width: '100%'
    }}>
        404页面丢失
    </Box>
  )
}

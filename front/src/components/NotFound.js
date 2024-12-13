import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/bg/404.png'; // Import the image

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '50% auto',       // Ensure the image covers the entire background
        backgroundRepeat: 'no-repeat', // Prevent the image from repeating
        backgroundPosition: 'center',  // Center the image
        backgroundAttachment: 'fixed', // Keep the image fixed during scrolling
        width: '100%',                 // Ensure the image fills the entire width
        textAlign: 'center',
      }}
    >

      <Typography variant="h4" sx={{ mb: 3, color: '#35363b' }}>
          
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{
          backgroundColor: '#B2171A',
          '&:hover': {
            backgroundColor: '#8c1013',
          },
        }}
      >
        Retour
      </Button>
    </Box>
  );
};

export default NotFound;

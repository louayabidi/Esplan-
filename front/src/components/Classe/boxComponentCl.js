import React from 'react';
import { Box, Button, Typography, Card, CardContent, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import SessionIcon from '@mui/icons-material/EventNote';
import ExamIcon from '@mui/icons-material/Assignment';

const BoxComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start', // Align the cards at the top
        alignItems: 'flex-start',
        flexDirection: 'column', // Align cards in a row
        p: 2,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: 4,
          mt: 2,
        }}
      >
        <Card 
          sx={{ 
            width: 400, 
            height: 500, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            borderRadius: 2, 
            boxShadow: 3, 
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <SessionIcon sx={{ fontSize: 150, mb: 2, color: '#35363b' }} />
              <Typography variant="h4" component="div">
                Classe
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-start' }}>
            <Button 
              size="large" 
              variant="contained" 
              component={Link} 
              to="/ClasseList" 
              sx={{ 
                backgroundColor: '#B2171A', 
                color: 'white', 
                '&:hover': {
                  backgroundColor: '#8c1013',
                },
              }}
            >
              Consulter
            </Button>
          </CardActions>
        </Card>

        <Card 
          sx={{ 
            width: 400,
            height: 500, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            borderRadius: 2, 
            boxShadow: 3, 
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ExamIcon sx={{ fontSize: 150, mb: 2, color: '#35363b' }} />
              <Typography variant="h4" component="div">
                Niveau
              </Typography>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-start' }}>
            <Button 
              size="large" 
              variant="contained" 
              component={Link} 
              to="/NiveauList" 
              sx={{ 
                backgroundColor: '#B2171A', 
                color: 'white', 
                '&:hover': {
                  backgroundColor: '#8c1013',
                },
              }}
            >
              Consulter
            </Button>
          </CardActions>
        </Card>

        
      </Box>
    </Box>
  );
}

export default BoxComponent;

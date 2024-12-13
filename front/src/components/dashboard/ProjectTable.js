import React from 'react';
import './App.css';
import { styled } from '@mui/system';
import Logo from '../../assets/images/logos/logo.png'; // Assurez-vous d'avoir le logo approprié

const AppContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
  backgroundColor: '#c8c5c5', // Rouge foncé pour le fond
  color: '#fff',
  textAlign: 'center',
  flexDirection: 'column',
  padding: '0 20px',
});

const LogoContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
});

const Title = styled('h1')({
  fontSize: '3.5rem',
  fontWeight: 'bold',
  color: '#000', // Texte en noir pour contraster avec le fond rouge
  marginBottom: '10px',
});





function App() {
  return (
    <AppContainer>
      <LogoContainer>
        <img src={Logo} alt="ES.PLAN Logo" style={{ height: '200px' }} /> {/* Ajustez la taille si besoin */}
      </LogoContainer>
      <Title>Bienvenue sur ES.PLAN</Title>
      
      
    </AppContainer>
  );
}

export default App;

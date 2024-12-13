import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Ajoutez Link
import axios from 'axios';
import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  TextField,
  Box,
  Typography,
  ThemeProvider,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import logo from '../../assets/images/logos/logo.png'; // Assurez-vous d'avoir le logo approprié
import './login.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    client.get("/api/user")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function submitLogin(e) {
    e.preventDefault();
    client.post("/api/login", { email, password })
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setError('Invalid email or password.');
      });
  }

  const handleRememberMeChange = (event) => {
    setShowPassword(event.target.checked);
  };

  if (currentUser) {
    navigate('/starter');
    return null;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ width: '70%', height: '70%', objectFit: 'contain' }} />
          <Typography component="h1" variant="h5">
            Se Connecter
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={submitLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" onChange={handleRememberMeChange} />}
              label="Consulter"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#B2171A' }}>
              Se Connecter
            </Button>
            <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Mot de passe oublié ?
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

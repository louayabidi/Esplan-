import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Input, Alert } from 'reactstrap';

const ResetPassword = () => {
  const { user_id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Validate token or perform additional setup if needed
  }, [user_id, token]);

  const validatePassword = (password) => {
    const minLength = 8;
    return password.length >= minLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    try {
      // Inclure user_id et token dans l'URL
      await axios.post(`http://127.0.0.1:8000/api/resetPassword/${user_id}/${token}/`, {
        new_password: password,
      });
      setSuccess('Mot de passe réinitialisé avec succès.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Erreur lors de la réinitialisation du mot de passe.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Réinitialiser le mot de passe</h2>
      {error && <Alert color="danger">{error}</Alert>}
      {success && <Alert color="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit">Réinitialiser le mot de passe</Button>
      </Form>
    </div>
  );
};

export default ResetPassword;

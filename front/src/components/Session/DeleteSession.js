import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

// Utility function to get the CSRF token from cookies
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const DeleteSession = () => {
  const { id_session } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      // Retrieve CSRF token from cookies
      const csrftoken = getCookie('csrftoken');
      
      await axios.delete(`http://127.0.0.1:8000/session/deleteSession/${id_session}/`, {
        headers: {
          'X-CSRFToken': csrftoken  // Include CSRF token in the headers
        }
      });
      alert('Session supprimée avec succès!');
      navigate('/session-list');  // Redirect to the session list or another page
    } catch (error) {
      console.error('Erreur lors de la suppression de la session:', error);
      alert('Échec de la suppression de la session.');
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer cette session ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteSession;

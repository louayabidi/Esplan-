import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

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

const DeleteNiveau = () => {
  const { id_niveau } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const csrftoken = getCookie('csrftoken');
      console.log(`Deleting niveau with ID: ${id_niveau}`); // Debugging line

      const response = await axios.delete(`http://127.0.0.1:8000/Niveau/deleteNiveau/${id_niveau}/`, {
        headers: {
          'X-CSRFToken': csrftoken  // Include CSRF token in the headers
        }
      });

      console.log(`Response status: ${response.status}`); // Debugging line
      if (response.status === 204) { // 204 No Content indicates successful deletion
        alert('Niveau supprimé avec succès!');
        navigate('/NiveauList');  // Redirect to the niveau list or another page
      } else {
        alert('Échec de la suppression du niveau.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du niveau:', error);
      if (error.response) {
        console.error(`Error response: ${error.response.status} - ${error.response.data}`);
        alert(`Erreur lors de la suppression du niveau. Status: ${error.response.status}`);
      } else if (error.request) {
        console.error('No response received.');
        alert('Erreur lors de la suppression du niveau. Aucune réponse reçue.');
      } else {
        console.error(`Error message: ${error.message}`);
        alert(`Erreur lors de la suppression du niveau. Message: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer ce niveau ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteNiveau

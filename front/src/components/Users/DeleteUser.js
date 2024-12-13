import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
const getCookie = (name) => {
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
};
const DeleteUser = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const csrftoken = getCookie('csrftoken');  // Dynamically extract CSRF token

      await axios.delete(`http://127.0.0.1:8000/api/deleteusers/${user_id}/`, {
        headers: {
            'X-CSRFToken': csrftoken
        }
    });
      alert('Utilisateur supprimé avec succès!');
      navigate('/user-list');  // Redirige vers la liste des utilisateurs ou une autre page
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur:', error);
      alert('Échec de la suppression de l’utilisateur.');
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteUser;

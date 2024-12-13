import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

// Fonction pour obtenir la valeur d'un cookie par son nom
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

// Configuration par défaut pour Axios pour inclure le cookie CSRF
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const DeleteModule_niveau = () => {
  const { id_module } = useParams(); // Récupère l'ID du module depuis les paramètres de l'URL
  const navigate = useNavigate(); // Utilise le hook navigate pour rediriger l'utilisateur après la suppression

  // Fonction pour gérer la suppression
  const handleDelete = async () => {
    try {
      const csrftoken = getCookie('csrftoken'); // Obtient le token CSRF du cookie

      await axios.delete(`http://127.0.0.1:8000/Module_niveau/deleteModule_niveau/${id_module}/`, {
        headers: {
          'X-CSRFToken': csrftoken // Inclut le token CSRF dans les en-têtes
        }
      });
      alert('Affectation supprimée avec succès !');
      navigate('/Module_niveau-list'); // Redirige vers la liste des affectations
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'affectation:', error);
      alert('Échec de la suppression de l\'affectation.');
    }
  };

  return (
    <div>
      <h2>Êtes-vous sûr de vouloir supprimer cette affectation ?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </div>
  );
};

export default DeleteModule_niveau;

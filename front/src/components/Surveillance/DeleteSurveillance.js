import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

const DeleteSurveillance = () => {
  const { id_surveillance } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/surveillance/${id_surveillance}/`);
      alert('Surveillance supprimée avec succès!');
      navigate('/surveillance-list');
    } catch (error) {
      console.error('Erreur lors de la suppression de la surveillance:', error);
      alert('Erreur lors de la suppression de la surveillance.');
    }
  };

  return (
    <Container>
      <h2>Êtes-vous sûr de vouloir supprimer cette surveillance?</h2>
      <Button color="danger" onClick={handleDelete}>
        Supprimer
      </Button>
    </Container>
  );
};

export default DeleteSurveillance;

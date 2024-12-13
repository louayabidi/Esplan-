import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import './SurveillanceList.css';

const SurveillanceList = () => {
  const [surveillances, setSurveillances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usernames, setUsernames] = useState({});
  const [salleNames, setSalleNames] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Function to fetch surveillance list
  const fetchSurveillances = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/Surveillance/surveillance-list');
      setSurveillances(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des surveillances !', error);
      setLoading(false);
    }
  };

  // Function to fetch room names by id (salle)
  const fetchSalleNames = async () => {
    const salleNames = {};
    const requests = surveillances.map(async (surveillance) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/salle/getsallebyid/${surveillance.id_salle}`);
        salleNames[surveillance.id_salle] = response.data.nom_salle;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(`Salle non trouvée: ${surveillance.id_salle}`);
          salleNames[surveillance.id_salle] = 'Salle non trouvée';
        } else {
          console.error('Erreur lors de la récupération du nom de la salle', error);
          salleNames[surveillance.id_salle] = null;
        }
      }
    });
    await Promise.all(requests);
    setSalleNames(salleNames);
  };

  // Function to fetch usernames
  const fetchUsernames = async () => {
    const usernames = {};
    const requests = surveillances.map(async (surveillance) => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/getonebyid/${surveillance.user_id}`);
        usernames[surveillance.user_id] = response.data.username;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error(`Utilisateur non trouvé: ${surveillance.user_id}`);
          usernames[surveillance.user_id] = 'Utilisateur non trouvé';
        } else {
          console.error("Erreur lors de la récupération du nom d'utilisateur", error);
          usernames[surveillance.user_id] = null;
        }
      }
    });
    await Promise.all(requests);
    setUsernames(usernames);
  };

  // Function to generate surveillances
  const generateSurveillances = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/Surveillance/get_csrf_token/');
      const csrfToken = response.data.csrfToken;

      await axios.post('http://127.0.0.1:8000/Surveillance/generate-surveillance/', null, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });
      alert('Surveillances générées avec succès');
      fetchSurveillances();
    } catch (error) {
      console.error('Erreur lors de la génération des surveillances', error);
    }
  };

  // Function to delete surveillance
  const handleDelete = async (surveillanceId) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/Surveillance/get_csrf_token/');
      const csrfToken = response.data.csrfToken;

      await axios.delete(`http://127.0.0.1:8000/Surveillance/delete-surveillance/${surveillanceId}/`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });

      alert('Surveillance supprimée avec succès');
      fetchSurveillances();
    } catch (error) {
      console.error('Erreur lors de la suppression de la surveillance', error);
    }
  };

  // useEffect to load surveillances when the component is initialized
  useEffect(() => {
    fetchSurveillances();
  }, []);

  // useEffect to fetch usernames and room names after surveillances are loaded
  useEffect(() => {
    if (surveillances.length > 0) {
      fetchUsernames();
      fetchSalleNames();
    }
  }, [surveillances]);

  // Loading display
  if (loading) {
    return <div>Chargement...</div>;
  }

  // Filter surveillances based on the search term
  const filteredSurveillances = surveillances.filter(surveillance => {
    const professorName = usernames[surveillance.user_id] || '';
    const roomName = salleNames[surveillance.id_salle] || '';
    return (
      professorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      roomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surveillance.date_surveillance.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Container className="surveillance-list-container">
      <h1>Liste des Surveillances</h1>
      <Input 
        type="text" 
        placeholder="Rechercher..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <Button color="primary" onClick={generateSurveillances}>
        Générer Surveillances
      </Button>
      <div className="table-responsive">
        <Table bordered className="surveillance-table">
          <thead>
            <tr>
              <th>Nom du Professeur</th>
              <th>Date de Surveillance</th>
              <th>Nom de l'examen</th>
              <th>Salle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSurveillances.map((surveillance) => (
              <tr key={surveillance.id_surveillance}>
                <td>{usernames[surveillance.user_id] || "Nom d'utilisateur non trouvé"}</td>
                <td>{surveillance.date_surveillance}</td>
                <td>{surveillance.nom_examen || 'Examen inconnu'}</td>
                <td>{salleNames[surveillance.id_salle] || 'Salle non trouvée'}</td>
                <td>
                  <Button color="warning" onClick={() => navigate(`/update-surveillance/${surveillance.id_surveillance}`)}>Modifier</Button>
                  <Button color="danger" onClick={() => handleDelete(surveillance.id_surveillance)}>Supprimer</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default SurveillanceList;

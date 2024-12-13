import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
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
const UpdateDepartement = () => {
  const [departementData, setDepartementData] = useState({
    id_departement: '',
    nom_departement: '',
  });

  const [message, setMessage] = useState('');
  const { id_departement } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartement = async () => {
      try {
        console.log(`Fetching departement with ID: ${id_departement}`);
        const response = await axios.get(`http://127.0.0.1:8000/departement/updateDep/${id_departement}/`);
        console.log('Departement data fetched:', response.data);
        setDepartementData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du département:', error);
        if (error.response && error.response.status === 404) {
          setMessage("Département non trouvé.");
        } else {
          setMessage("Erreur lors de la récupération des données du département.");
        }
      }
    };

    fetchDepartement();
  }, [id_departement]);

  const handleChange = (e) => {
    setDepartementData({
      ...departementData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');

    try {
      await axios.put(`http://127.0.0.1:8000/departement/updateDep/${id_departement}/`, departementData, {
        headers: {
          'X-CSRFToken': csrftoken  // Include CSRF token in the headers
        }
      });
      setMessage('Département mis à jour avec succès!');
      navigate('/DepartementList');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données du département:', error);
      setMessage("Échec de la mise à jour du département.");
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Mettre à jour le département
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="nom_departement">Nom du Département</Label>
                <Input
                  id="nom_departement"
                  name="nom_departement"
                  value={departementData.nom_departement}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <Button type="submit">Mettre à jour le département</Button>
            </Form>
          </CardBody>
        </Card>
        {message && <p>{message}</p>}
        <Button color="secondary" onClick={() => navigate('/DepartementList')}>Annuler</Button>
      </Col>
    </Row>
  );
};

export default UpdateDepartement;
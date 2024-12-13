import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

const UpdateModule = () => {
  const [moduleData, setModuleData] = useState({
    nom_module: '',
    duree_module: '',
    id_niveau: '',
  });

  const [niveaux, setNiveaux] = useState([]);
  const [message, setMessage] = useState('');
  const { id_module } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModule = async () => {
      try {
        console.log(`Fetching module with ID: ${id_module}`);
        const response = await axios.get(`http://127.0.0.1:8000/module/updateModule/${id_module}/`);
        console.log('Module data fetched:', response.data);
        setModuleData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du module:', error);
      }
    };

    const fetchNiveaux = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Niveau/displayallNiveaux/');
        setNiveaux(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des niveaux:', error);
      }
    };

    fetchModule();
    fetchNiveaux();
  }, [id_module]);

  const handleChange = (e) => {
    setModuleData({
      ...moduleData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const csrftoken = getCookie('csrftoken');

      await axios.put(`http://127.0.0.1:8000/module/updateModule/${id_module}/`, moduleData, {
        headers: {
          'X-CSRFToken': csrftoken  // Include CSRF token in the headers
        }
      });
      setMessage('Module mis à jour avec succès!');
      navigate('/module-list');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données du module:', error);
      setMessage('Échec de la mise à jour du module.');
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Mettre à jour le module
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="nom_module">Nom du module</Label>
                <Input
                  id="nom_module"
                  name="nom_module"
                  value={moduleData.nom_module}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="duree_module">Durée (en heures)</Label>
                <Input
                  id="duree_module"
                  name="duree_module"
                  value={moduleData.duree_module}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="id_niveau">Niveau</Label>
                <Input
                  type="select"
                  id="id_niveau"
                  name="id_niveau"
                  value={moduleData.id_niveau}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un niveau</option>
                  {niveaux.map(niveau => (
                    <option key={niveau.id_niveau} value={niveau.id_niveau}>
                      {niveau.libelleNiv}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <Button type="submit">Mettre à jour le module</Button>
            </Form>
          </CardBody>
        </Card>
        {message && <p>{message}</p>}
        <Link to="/module-list">
          <Button color="secondary">Annuler</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default UpdateModule;

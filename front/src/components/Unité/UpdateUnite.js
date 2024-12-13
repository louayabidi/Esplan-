import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
const UpdateUnite = () => {
  const { id_unite } = useParams();
  const [formData, setFormData] = useState({
    nom_unite: '',
    id_departement: ''
  });

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/unite/updateUnite/${id_unite}/`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the unite data!', error);
      });
  }, [id_unite]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');

    axios.put(`http://127.0.0.1:8000/unite/updateUnite/${id_unite}/`, formData, {
      headers: {
        'X-CSRFToken': csrftoken  // Include CSRF token in the headers
      }
    })
      .then(response => {
        alert('Unité mise à jour avec succès !');
        navigate('/UniteList');
      })
      .catch(error => {
        console.error('Il y a eu une erreur lors de la mise à jour de l\'unité!', error);
        alert('Erreur lors de la mise à jour de l\'unité.');
      });
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Mettre à jour une Unité
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="nom_unite">Nom de l'Unité</Label>
                <Input
                  id="nom_unite"
                  name="nom_unite"
                  value={formData.nom_unite}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="id_departement">ID du Département</Label>
                <Input
                  id="id_departement"
                  name="id_departement"
                  value={formData.id_departement}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <Button type="submit">Mettre à jour l'unité</Button>
            </Form>
          </CardBody>
        </Card>
        <Link to="/unites">
          <Button color="secondary">
            Annuler
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default UpdateUnite;
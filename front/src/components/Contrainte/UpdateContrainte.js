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
const UpdateContrainte = () => {
  const { id_contrainte } = useParams();
  const [formData, setFormData] = useState({
    nom_contrainte: '',
    type_contrainte: '',
    date_debut_contrainte: '',
    date_fin_contrainte: '',
    status_contrainte: '',
    id_user: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the current data of the contrainte
    axios.get(`http://127.0.0.1:8000/Contrainte/updateContrainte/${id_contrainte}/`)
      .then(response => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the contrainte data!', error);
        setError('Failed to fetch contrainte data');
        setLoading(false);
      });
  }, [id_contrainte]);

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

    axios.put(`http://127.0.0.1:8000/Contrainte/updateContrainte/${id_contrainte}/`, formData, {
      headers: {
        'X-CSRFToken': csrftoken  // Include CSRF token in the headers
      }
    })
      .then(response => {
        alert('Contrainte mise à jour avec succès !');
        navigate('/ContrainteList');
      })
      .catch(error => {
        console.error('Il y a eu une erreur lors de la mise à jour de la contrainte!', error);
        alert('Erreur lors de la mise à jour de la contrainte.');
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Mettre à jour une Contrainte
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="nom_contrainte">Nom de la Contrainte</Label>
                <Input
                  id="nom_contrainte"
                  name="nom_contrainte"
                  value={formData.nom_contrainte}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="type_contrainte">Type de Contrainte</Label>
                <Input
                  id="type_contrainte"
                  name="type_contrainte"
                  value={formData.type_contrainte}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="date_debut_contrainte">Date de Début</Label>
                <Input
                  type="date"
                  id="date_debut_contrainte"
                  name="date_debut_contrainte"
                  value={formData.date_debut_contrainte}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="date_fin_contrainte">Date de Fin</Label>
                <Input
                  type="date"
                  id="date_fin_contrainte"
                  name="date_fin_contrainte"
                  value={formData.date_fin_contrainte}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="status_contrainte">Status de la Contrainte</Label>
                <Input
                  id="status_contrainte"
                  name="status_contrainte"
                  value={formData.status_contrainte}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="id_user">ID de l'Utilisateur</Label>
                <Input
                  id="id_user"
                  name="id_user"
                  value={formData.id_user}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <Button type="submit">Mettre à jour la Contrainte</Button>
            </Form>
          </CardBody>
        </Card>
        <Link to="/ContrainteList">
          <Button color="secondary">
            Annuler
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default UpdateContrainte;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from 'reactstrap';

// Function to get CSRF token from cookies
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

// Set CSRF token configuration for axios
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const EditNiveau = () => {
  const [formData, setFormData] = useState({
    libelleNiv: '',
    specialite: '',
    nbclasseNiv: 0 // Set to 0 by default
  });
  const [requiresSpecialite, setRequiresSpecialite] = useState(false);
  const [errors, setErrors] = useState({});

  const { id_niveau } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/Niveau/Niveau/${id_niveau}/`)
      .then(response => {
        const fetchedData = response.data;
        setFormData(fetchedData);
        setRequiresSpecialite(fetchedData.libelleNiv === '4' || fetchedData.libelleNiv === '5');
      })
      .catch(error => {
        console.error('There was an error fetching the niveau!', error);
      });
  }, [id_niveau]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSpecialiteToggle = (e) => {
    setRequiresSpecialite(e.target.checked);
    if (!e.target.checked) {
      setFormData({ ...formData, specialite: '' });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.libelleNiv.trim()) {
      errors.libelleNiv = 'Le libellé du niveau est requis.';
    }
    if (requiresSpecialite && !formData.specialite.trim()) {
      errors.specialite = 'La spécialité est requise lorsque le niveau nécessite une spécialité.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const dataToSend = {
      ...formData,
      nbclasseNiv: 0, // Ensure nbclasseNiv is always 0
      specialite: requiresSpecialite ? formData.specialite : ''
    };

    const csrftoken = getCookie('csrftoken');

    axios.put(`http://127.0.0.1:8000/Niveau/updateNiveau/${id_niveau}/`, dataToSend, {
      headers: {
        'X-CSRFToken': csrftoken // Include CSRF token in the headers
      }
    })
    .then(response => {
      alert('Niveau updated successfully!');
      navigate('/NiveauList');
    })
    .catch(error => {
      console.error('There was an error updating the niveau!', error);
      alert('Error updating niveau.');
    });
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Modifier le Niveau
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="libelleNiv">Libellé du Niveau</Label>
                <Input
                  id="libelleNiv"
                  name="libelleNiv"
                  type="text"
                  value={formData.libelleNiv}
                  onChange={handleChange}
                  required
                  invalid={!!errors.libelleNiv}
                />
                {errors.libelleNiv && <FormFeedback>{errors.libelleNiv}</FormFeedback>}
              </FormGroup>
              {/* Removed the nbclasseNiv field */}
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={requiresSpecialite}
                    onChange={handleSpecialiteToggle}
                  />
                  Ce niveau nécessite une spécialité
                </Label>
              </FormGroup>
              {requiresSpecialite && (
                <FormGroup>
                  <Label for="specialite">Spécialité</Label>
                  <Input
                    id="specialite"
                    name="specialite"
                    type="text"
                    value={formData.specialite}
                    onChange={handleChange}
                    invalid={!!errors.specialite}
                  />
                  {errors.specialite && <FormFeedback>{errors.specialite}</FormFeedback>}
                </FormGroup>
              )}
              <Button type="submit">Modifier le Niveau</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default EditNiveau;

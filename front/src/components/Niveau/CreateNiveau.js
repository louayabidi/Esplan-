import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from 'reactstrap';

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

const AddNiveau = () => {
  const [formData, setFormData] = useState({
    libelleNiv: '',
    specialite: '',
    nbclasseNiv: 0 // Default to 0
  });
  const [requiresSpecialite, setRequiresSpecialite] = useState(false);
  const [errors, setErrors] = useState({});
  const [existingNiveaux, setExistingNiveaux] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing niveaux when the component mounts
    axios.get('http://127.0.0.1:8000/Niveau/displayallNiveaux/')
      .then(response => {
        setExistingNiveaux(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching niveaux!', error);
      });
  }, []);

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
    const startsWithNumber = /^[0-9]/;
  
    if (!formData.libelleNiv.trim()) {
      errors.libelleNiv = 'Le libellé du niveau est requis.';
    } else if (!startsWithNumber.test(formData.libelleNiv)) {
      errors.libelleNiv = 'Le libellé du niveau doit commencer par un chiffre.';
    }
  
    if (requiresSpecialite && !formData.specialite.trim()) {
      errors.specialite = 'La spécialité est requise lorsque le niveau nécessite une spécialité.';
    }
  
    return errors;
  };
  const checkIfNiveauExists = () => {
    return existingNiveaux.some(niveau => 
      niveau.libelleNiv === formData.libelleNiv && 
      (niveau.specialite === formData.specialite || (!requiresSpecialite && !niveau.specialite))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (checkIfNiveauExists()) {
      alert('Ce niveau existe déjà!');
      return;
    }

    const csrftoken = getCookie('csrftoken'); // Extract CSRF token

    // Set nbclasseNiv to 0 before sending the data
    const dataToSend = {
      ...formData,
      nbclasseNiv: 0,
      specialite: requiresSpecialite ? formData.specialite : ''
    };

    axios.post('http://127.0.0.1:8000/Niveau/addNiveau/', dataToSend, {
      headers: {
        'X-CSRFToken': csrftoken
      }
    })
      .then(response => {
        if (response.status === 201) {
          alert('Niveau ajouté avec succès!');
          setFormData({ libelleNiv: '', specialite: '', nbclasseNiv: 0 }); // Reset form
          setErrors({});
          navigate('/NiveauList');
        } else {
          alert('Réponse inattendue du serveur.');
        }
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du niveau!', error);
        if (error.response) {
          alert(`Erreur d'ajout du niveau. Statut: ${error.response.status}, Données: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          alert('Erreur d\'ajout du niveau. Aucune réponse reçue.');
        } else {
          alert(`Erreur d'ajout du niveau. Message: ${error.message}`);
        }
      });
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Ajouter un Niveau
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="libelleNiv">Libellé du Niveau (ex : 1A)</Label>
                <Input
                  id="libelleNiv"
                  name="libelleNiv"
                  type="text"
                  value={formData.libelleNiv}
                  onChange={handleChange}
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
              <Button type="submit">Ajouter le Niveau</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AddNiveau;

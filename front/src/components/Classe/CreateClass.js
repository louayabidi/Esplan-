import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const AddClass = () => {
  const [formData, setFormData] = useState({
    NbEtudiantClasse: '',
    id_niveau: '',
    startingLibelleClasse: '',
    numberOfClasses: 1
  });
  const [errors, setErrors] = useState({});
  const [niveaux, setNiveaux] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch niveaux for the select dropdown
    axios.get('http://127.0.0.1:8000/Niveau/displayallNiveaux/')
      .then(response => {
        setNiveaux(response.data);
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

  const validate = () => {
    const errors = {};
    const { NbEtudiantClasse, numberOfClasses, startingLibelleClasse } = formData;

    if (Number(NbEtudiantClasse) > 40) {
      errors.NbEtudiantClasse = 'Le nombre d\'étudiants ne peut pas dépasser 40.';
    }

    if (Number(numberOfClasses) < 1) {
      errors.numberOfClasses = 'Le nombre de classes à ajouter doit être au moins 1.';
    }

    if (Number(startingLibelleClasse) < 1) {
      errors.startingLibelleClasse = 'Le libellé de la classe de départ doit être un nombre positif.';
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

    const csrftoken = getCookie('csrftoken'); // Extract CSRF token
    const classes = [];

    for (let i = 0; i < formData.numberOfClasses; i++) {
      classes.push({
        NbEtudiantClasse: formData.NbEtudiantClasse,
        id_niveau: formData.id_niveau,
        libelleClasse: `${parseInt(formData.startingLibelleClasse) + i}`
      });
    }

    // Use Promise.all to send multiple requests
    Promise.all(
      classes.map(cls => 
        axios.post('http://127.0.0.1:8000/Classe/addClasse/', cls, {
          headers: {
            'X-CSRFToken': csrftoken  // Include CSRF token in the headers
          }
        })
      )
    )
    .then(() => {
      alert('Classes added successfully!');
      navigate('/ClasseList');
      setFormData({
        NbEtudiantClasse: '',
        id_niveau: '',
        startingLibelleClasse: '',
        numberOfClasses: 1
      });
    })
    .catch(error => {
      console.error('There was an error adding the classes!', error);
      alert('Error adding classes.');
    });
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Ajouter des Classes
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="NbEtudiantClasse">Nombre d'Étudiants</Label>
                <Input
                  id="NbEtudiantClasse"
                  name="NbEtudiantClasse"
                  type="number"
                  value={formData.NbEtudiantClasse}
                  onChange={handleChange}
                  required
                  invalid={!!errors.NbEtudiantClasse}
                />
                {errors.NbEtudiantClasse && <FormFeedback>{errors.NbEtudiantClasse}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="id_niveau">Niveau</Label>
                <Input
                  id="id_niveau"
                  name="id_niveau"
                  type="select"
                  value={formData.id_niveau}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un Niveau</option>
                  {niveaux.map(niveau => (
                    <option key={niveau.id_niveau} value={niveau.id_niveau}>
                      {niveau.libelleNiv} {niveau.specialite}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="startingLibelleClasse">Libellé Classe de départ</Label>
                <Input
                  id="startingLibelleClasse"
                  name="startingLibelleClasse"
                  type="number"
                  value={formData.startingLibelleClasse}
                  onChange={handleChange}
                  required
                  invalid={!!errors.startingLibelleClasse}
                />
                {errors.startingLibelleClasse && <FormFeedback>{errors.startingLibelleClasse}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="numberOfClasses">Nombre de Classes à ajouter</Label>
                <Input
                  id="numberOfClasses"
                  name="numberOfClasses"
                  type="number"
                  value={formData.numberOfClasses}
                  onChange={handleChange}
                  min="1"
                  required
                  invalid={!!errors.numberOfClasses}
                />
                {errors.numberOfClasses && <FormFeedback>{errors.numberOfClasses}</FormFeedback>}
              </FormGroup>
              <Button type="submit">Ajouter les Classes</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AddClass;

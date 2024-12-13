import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
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

const AddSalle = () => {
  const [salleData, setSalleData] = useState({
    nom_salle: '',
    capacite: '',
    dispo: true,
    id_bloc: ''
  });

  const [blocs, setBlocs] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/bloc/displayAllBlocs/')
      .then(response => {
        setBlocs(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
  }, []);

  const handleChange = (e) => {
    setSalleData({
      ...salleData,
      [e.target.name]: e.target.value
    });
  };

  const validateFields = () => {
    const validationErrors = {};
    const salleRegex = /^[A-M][1-4]0[1-9]$/;

    if (!salleRegex.test(salleData.nom_salle)) {
      validationErrors.nom_salle = "Le nom de la salle doit commencer par une lettre de A à M, suivie d'un chiffre entre 1 et 4, puis 0 et un chiffre entre 1 et 9 (ex: A10).";
    }

    if (!salleData.capacite || salleData.capacite <= 0) {
      validationErrors.capacite = "La capacité doit être un nombre supérieur à 0.";
    }

    if (!salleData.id_bloc) {
      validationErrors.id_bloc = "Veuillez sélectionner un bloc.";
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.post('http://127.0.0.1:8000/salle/addSalle/', salleData, {
      headers: {
        'X-CSRFToken': csrftoken
      }
    })
      .then(response => {
        alert('Salle ajoutée avec succès!');
        navigate('/salle-list');
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
  };

  return (
    <Row>
      <Col lg="12">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="nom_salle">Nom de la Salle</Label>
            <Input
              id="nom_salle"
              name="nom_salle"
              value={salleData.nom_salle}
              onChange={handleChange}
              invalid={!!errors.nom_salle}
              required
            />
            {errors.nom_salle && <FormFeedback>{errors.nom_salle}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="capacite">Capacité</Label>
            <Input
              id="capacite"
              name="capacite"
              type="number"
              value={salleData.capacite}
              onChange={handleChange}
              invalid={!!errors.capacite}
              required
            />
            {errors.capacite && <FormFeedback>{errors.capacite}</FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="dispo">Disponibilité</Label>
            <Input
              id="dispo"
              name="dispo"
              type="select"
              value={salleData.dispo}
              onChange={handleChange}
              required
            >
              <option value={true}>Oui</option>
              <option value={false}>Non</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="id_bloc">Bloc</Label>
            <Input
              id="id_bloc"
              name="id_bloc"
              type="select"
              value={salleData.id_bloc}
              onChange={handleChange}
              invalid={!!errors.id_bloc}
              required
            >
              <option value="">Sélectionnez un bloc</option>
              {blocs.map(bloc => (
                <option key={bloc.id_bloc} value={bloc.id_bloc}>
                  {bloc.nom_bloc}
                </option>
              ))}
            </Input>
            {errors.id_bloc && <FormFeedback>{errors.id_bloc}</FormFeedback>}
          </FormGroup>
          
          <Button type="submit" color="primary">Ajouter une salle</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default AddSalle;

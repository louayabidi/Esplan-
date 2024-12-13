import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
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
const EditSalle = () => {
  const { id_salle } = useParams();
  const navigate = useNavigate();
  
  const [salleData, setSalleData] = useState({
    nom_salle: '',
    capacite: '',
    dispo: true,
    id_bloc: '',
    id_examen: ''
  });
  
  const [blocs, setBlocs] = useState([]);

  useEffect(() => {
    // Fetch salle data
    axios.get(`http://127.0.0.1:8000/salle/updateSalle/${id_salle}/`)
      .then(response => {
        setSalleData(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de la salle!", error);
      });
    
    // Fetch blocs data
    axios.get('http://127.0.0.1:8000/bloc/displayAllBlocs/')
      .then(response => {
        setBlocs(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des blocs!", error);
      });

   
  }, [id_salle]);

  const handleChange = (e) => {
    setSalleData({
      ...salleData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');

    axios.put(`http://127.0.0.1:8000/salle/updateSalle/${id_salle}/`, salleData, {
      headers: {
        'X-CSRFToken': csrftoken  // Include CSRF token in the headers
      }
    })
      .then(response => {
        alert('Salle modifiée avec succès!');
        navigate('/salle-list');
      })
      .catch(error => {
        console.error("Erreur lors de la modification de la salle!", error);
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
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="capacite">Capacité</Label>
            <Input
              id="capacite"
              name="capacite"
              type="number"
              value={salleData.capacite}
              onChange={handleChange}
              required
            />
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
              required
            >
              <option value="">Sélectionnez un bloc</option>
              {blocs.map(bloc => (
                <option key={bloc.id_bloc} value={bloc.id_bloc}>
                  {bloc.nom_bloc}
                </option>
              ))}
            </Input>
          </FormGroup>
         
          <Button type="submit" color="primary">Modifier la salle</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default EditSalle;

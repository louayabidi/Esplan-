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

const EditSalleExamen = () => {
  const { id_salle, id_examen } = useParams();
  const navigate = useNavigate();

  const [salleExamenData, setSalleExamenData] = useState({
    id_salle: '',
    id_examen: '',
    date_salle: ''
  });

  const [salles, setSalles] = useState([]);
  const [examens, setExamens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSalleExamen = await axios.get(`http://127.0.0.1:8000/Salle_examen/updateSalle_examen/${id_salle}/${id_examen}/`);
        setSalleExamenData(responseSalleExamen.data);

        const responseSalles = await axios.get('http://127.0.0.1:8000/salle/displayAllS');
        setSalles(responseSalles.data);

        const responseExamens = await axios.get('http://127.0.0.1:8000/examen/displayall');
        setExamens(responseExamens.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données!", error);
      }
    };

    fetchData();
  }, [id_salle, id_examen]);

  const handleChange = (e) => {
    setSalleExamenData({
      ...salleExamenData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');

    try {
      await axios.put(`http://127.0.0.1:8000/Salle_examen/updateSalle_examen/${id_salle}/${id_examen}/`, salleExamenData, {
        headers: {
          'X-CSRFToken': csrftoken
        }
      });
      alert('Salle d\'examen modifiée avec succès!');
      navigate('/salle_examen-list');
    } catch (error) {
      console.error("Erreur lors de la modification de la salle d'examen!", error);
    }
  };

  return (
    <Row>
      <Col lg="12">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="id_salle">Salle</Label>
            <Input
              id="id_salle"
              name="id_salle"
              type="select"
              value={salleExamenData.id_salle}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez une salle</option>
              {salles.map(salle => (
                <option key={salle.id_salle} value={salle.id_salle}>
                  {salle.nom_salle}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="id_examen">Examen</Label>
            <Input
              id="id_examen"
              name="id_examen"
              type="select"
              value={salleExamenData.id_examen}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez un examen</option>
              {examens.map(examen => (
                <option key={examen.id_examen} value={examen.id_examen}>
                  {examen.nom_examen}
                </option>
              ))}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="date_salle">Date et Heure</Label>
            <Input
              id="date_salle"
              name="date_salle"
              type="datetime-local"  // Allows both date and time selection
              value={salleExamenData.date_salle}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit" color="primary">Modifier</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default EditSalleExamen;

// UpdateSurveillance.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const UpdateSurveillance = () => {
  const [surveillanceData, setSurveillanceData] = useState({
    user_id: '', // Only user_id should be editable
  });

  const [salles, setSalles] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // Utility function to get CSRF token
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

  useEffect(() => {
    const fetchSurveillance = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/Surveillance/update-surveillance/${id}/`);
        setSurveillanceData({ user_id: response.data.user_id }); // Only set user_id
      } catch (error) {
        console.error('Erreur lors de la récupération des données surveillance:', error);
        setMessage("Erreur lors de la récupération des données de la surveillance.");
      }
    };

    const fetchSalles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/salle/displayall/');
        setSalles(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des salles:', error);
        setMessage("Erreur lors de la récupération des salles.");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/users/displayall/');
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setMessage("Erreur lors de la récupération des utilisateurs.");
      }
    };

    fetchSurveillance();
    fetchSalles();
    fetchUsers();
  }, [id]);

  const handleChange = (e) => {
    setSurveillanceData({
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');

    try {
      await axios.put(`http://127.0.0.1:8000/update-surveillance/${id}/`, surveillanceData, {
        headers: {
          'X-CSRFToken': csrftoken,
        }
      });
      setMessage('Surveillance mise à jour avec succès!');
      navigate('/SurveillanceList');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la surveillance:', error);
      setMessage("Échec de la mise à jour de la surveillance.");
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Mettre à jour la surveillance
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="user_id">Professeur</Label>
                <Input
                  id="user_id"
                  name="user_id"
                  type="select"
                  value={surveillanceData.user_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un professeur</option>
                  {users.map((user) => (
  <option key={user.user_id} value={user.user_id}>
    {user.username}
  </option>
))}

                </Input>
              </FormGroup>

              <Button type="submit">Mettre à jour la surveillance</Button>
            </Form>
          </CardBody>
        </Card>
        {message && <p>{message}</p>}
        <Link to="/SurveillanceList">
          <Button color="secondary">Annuler</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default UpdateSurveillance;

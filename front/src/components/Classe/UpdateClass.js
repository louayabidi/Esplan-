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
  Input
} from 'reactstrap';
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
const EditClass = () => {
    const [formData, setFormData] = useState({
        NbEtudiantClasse: '',
        id_niveau: '',
        libelleClasse: ''
    });
    const { id_classe } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/Classe/getClasse/${id_classe}/`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the classe!', error);
            });
    }, [id_classe]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');

        axios.put(`http://127.0.0.1:8000/Classe/updateClasse/${id_classe}/`, formData, {
            headers: {
              'X-CSRFToken': csrftoken  // Include CSRF token in the headers
            }
          })
            .then(response => {
                alert('Classe updated successfully!');
                navigate('/ClasseList');
            })
            .catch(error => {
                console.error('There was an error updating the classe!', error);
                alert('Error updating classe.');
            });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Modifier la Classe
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
                                />
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
                                    <option value="">Select Niveau</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3A">3A</option>
                                    <option value="3B">3B</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="libelleClasse">Libellé de la Classe</Label>
                                <Input
                                    id="libelleClasse"
                                    name="libelleClasse"
                                    value={formData.libelleClasse}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <Button type="submit">Modifier la Classe</Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default EditClass;

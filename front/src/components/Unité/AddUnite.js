import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Input
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
const AddUnite = () => {
    const [formData, setFormData] = useState({
        nom_unite: '',
        id_departement: ''
    });
    const [departements, setDepartements] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/departement/departements/')
            .then(response => {
                setDepartements(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the departments!', error);
            });
    }, []);

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
        const csrftoken = getCookie('csrftoken');  // Dynamically extract CSRF token

        axios.post('http://127.0.0.1:8000/unite/addUnite/', formData, {
            headers: {
                'X-CSRFToken': csrftoken  // Include CSRF token in the headers
            }
        })
        .then(response => {
            alert('Unite added successfully!');
            navigate('/UniteList');
            setFormData({
                nom_unite: '',
                id_departement: ''
            });
        })
        .catch(error => {
            console.error('There was an error adding the unite!', error);
            alert('Error adding unite.');
        });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Ajouter une Unite
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="nom_unite">Nom de l'Unite</Label>
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
                                    type="select"
                                    id="id_departement"
                                    name="id_departement"
                                    value={formData.id_departement}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Choisissez un département</option>
                                    {departements.map(departement => (
                                        <option key={departement.id_departement} value={departement.id_departement}>
                                            {departement.nom_departement}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <Button type="submit">Ajouter l'Unite</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/UniteList">
                  <Button color="secondary">
                     Annuler
                  </Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddUnite;
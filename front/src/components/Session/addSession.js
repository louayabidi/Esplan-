import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Row, Col, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

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

const AddSession = () => {
    const [formData, setFormData] = useState({
        nom_session: '',
        type_session: '',
        date_d: '',  // New field
        date_f: ''   // New field
    });

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

        axios.post('http://127.0.0.1:8000/session/addSession/', formData, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        .then(response => {
            alert('Session ajoutée avec succès!');
            navigate('/session-list');
            setFormData({
                nom_session: '',
                type_session: '',
                date_d: '',  // Reset new fields
                date_f: ''
            });
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout de la session!', error);
            alert('Erreur lors de l\'ajout de la session.');
        });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Ajouter une session
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="nom_session">Nom de la session</Label>
                                <Input
                                    id="nom_session"
                                    name="nom_session"
                                    value={formData.nom_session}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="type_session">Type de la session</Label>
                                <Input
                                    id="type_session"
                                    name="type_session"
                                    value={formData.type_session}
                                    onChange={handleChange}
                                    type="select"
                                    required
                                >
                                    <option value="">Sélectionnez le type de session</option>
                                    <option value="principale">Principale</option>
                                    <option value="ratrapage">Rattrapage</option>
                                    <option value="decembre">Décembre</option>
                                    <option value="septembre">Septembre</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="date_d">Date de début</Label>
                                <Input
                                    id="date_d"
                                    name="date_d"
                                    type="date"
                                    value={formData.date_d}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="date_f">Date de fin</Label>
                                <Input
                                    id="date_f"
                                    name="date_f"
                                    type="date"
                                    value={formData.date_f}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <Button type="submit">Ajouter la session</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/session-list">
                    <Button color="secondary">Annuler</Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddSession;

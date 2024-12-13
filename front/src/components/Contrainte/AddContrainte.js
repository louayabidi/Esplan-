import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

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

const AddContrainte = () => {
    const [formData, setFormData] = useState({
        nom_contrainte: '',
        type_contrainte: '',
        date_debut_contrainte: '',
        date_fin_contrainte: '',
        status_contrainte: '',
        id_user: ''
    });

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/displayall')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des utilisateurs!", error);
            });
    }, []);

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

        axios.post('http://127.0.0.1:8000/Contrainte/addContrainte/', formData, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
            .then(response => {
                alert('Contrainte ajoutée avec succès !');
                navigate('/ContrainteList');
                setFormData({
                    nom_contrainte: '',
                    type_contrainte: '',
                    date_debut_contrainte: '',
                    date_fin_contrainte: '',
                    status_contrainte: '',
                    id_user: ''
                });
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la contrainte !', error);
                alert('Erreur lors de l\'ajout de la contrainte.');
            });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Ajouter une Contrainte
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="nom_contrainte">Nom de la Contrainte</Label>
                                <Input
                                    id="nom_contrainte"
                                    name="nom_contrainte"
                                    type="select"
                                    value={formData.nom_contrainte}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez une contrainte</option>
                                    <option value="enceinte">Enceinte</option>
                                    <option value="congé">Congé</option>
                                    <option value="congé de maladie">Congé de maladie</option>
                                    <option value="état de santé">État de santé</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="type_contrainte">Type de Contrainte</Label>
                                <Input
                                    id="type_contrainte"
                                    name="type_contrainte"
                                    value={formData.type_contrainte}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="date_debut_contrainte">Date de Début</Label>
                                <Input
                                    type="date"
                                    id="date_debut_contrainte"
                                    name="date_debut_contrainte"
                                    value={formData.date_debut_contrainte}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="date_fin_contrainte">Date de Fin</Label>
                                <Input
                                    type="date"
                                    id="date_fin_contrainte"
                                    name="date_fin_contrainte"
                                    value={formData.date_fin_contrainte}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="status_contrainte">Status</Label>
                                <Input
                                    id="status_contrainte"
                                    name="status_contrainte"
                                    value={formData.status_contrainte}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="id_user">Utilisateur</Label>
                                <Input
                                    id="id_user"
                                    name="id_user"
                                    type="select"
                                    value={formData.id_user}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez un utilisateur</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.user_id}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <Button type="submit">Ajouter la Contrainte</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/ContrainteList">
                    <Button color="secondary">
                        Annuler
                    </Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddContrainte;

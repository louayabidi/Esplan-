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
const AddExamen = () => {
    const [formData, setFormData] = useState({
        nom_examen: '',
        duree_examen: '',
        type_examen: '',
        nbrclasse: '',
        id_session: '',
        id_module: '',
    });

    const [sessions, setSessions] = useState([]);
    const [modules, setModules] = useState([]);

    useEffect(() => {
        // Fetch sessions from the API
        axios.get('http://127.0.0.1:8000/session/displayall')
            .then(response => {
                setSessions(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the sessions!', error);
            });

        // Fetch modules from the API
        axios.get('http://127.0.0.1:8000/module/displayall')
            .then(response => {
                setModules(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the modules!', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();  // Déclaration correcte
    const handleSubmit = (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');  // Dynamically extract CSRF token

        const dataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            dataToSend.append(key, formData[key]);
        });

        axios.post('http://127.0.0.1:8000/examen/addExamen/', dataToSend, {
            headers: {
                'X-CSRFToken': csrftoken  // Include CSRF token in the headers
            }
        })
        .then(response => {
            alert('Examen ajouté avec succès !');
            navigate('/examen-list'); 
            setFormData({
                nom_examen: '',
                
                duree_examen: '',
                type_examen: '',
                id_session: '',
                id_module: '',
                nbrclasse:'',
            });
        })
        .catch(error => {
            console.error('Il y a eu une erreur lors de l\'ajout de l\'examen !', error);
            alert('Erreur lors de l\'ajout de l\'examen.');
        });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Ajouter un examen
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="nom_examen">Nom d'examen</Label>
                                <Input
                                    id="nom_examen"
                                    name="nom_examen"
                                    value={formData.nom_examen}
                                    onChange={handleChange}
                                    required
                                />
                            
                            </FormGroup>
                    

                            <FormGroup>
                                <Label for="duree_examen">Durée (en heure)</Label>
                                <Input
                                    id="duree_examen"
                                    name="duree_examen"
                                    value={formData.duree_examen}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="nbrclasse">Nombre des classes</Label>
                                <Input
                                    id="nbrclasse"
                                    name="nbrclasse"
                                    value={formData.nbrclasse}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="type_examen">Type d'examen</Label>
                                <Input
                                    id="type_examen"
                                    name="type_examen"
                                    value={formData.type_examen}
                                    onChange={handleChange}
                                    type="select"
                                    required
                                >
                                   <option value="">Sélectionnez le type d'examen</option>
                                    <option value="theorique">Théorique</option>
                                    <option value="pratique">Pratique</option>
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="id_session">Session</Label>
                                <Input
                                    id="id_session"
                                    name="id_session"
                                    type="select"
                                    value={formData.id_session}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez une session</option>
                                    {sessions.map(session => (
                                        <option key={session.id_session} value={session.id_session}>
                                            {session.nom_session}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="id_module">Module</Label>
                                <Input
                                    id="id_module"
                                    name="id_module"
                                    type="select"
                                    value={formData.id_module}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez un module</option>
                                    {modules.map(module => (
                                        <option key={module.id_module} value={module.id_module}>
                                            {module.nom_module}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                           
                            <Button type="submit">Ajouter l'examen</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/examen-list">
                    <Button color="secondary">
                        Annuler
                    </Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddExamen;

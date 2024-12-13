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

// Fonction pour obtenir la valeur d'un cookie par son nom
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

const AddSalle_examen = () => {
    const [formData, setFormData] = useState({
        id_salle: '',
        id_examen: '',
        date_salle:''
    });

  const [salles, setSalles] = useState([]);
  const [examens, setExamens] = useState([]);

    useEffect(() => {
        // Récupérer les données des modules
        axios.get('http://127.0.0.1:8000/salle/displayAllS')
            .then(response => {
                setSalles(response.data);
            })
            .catch(error => {
                console.error('Il y a eu une erreur lors de la récupération des salles!', error);
            });

        // Récupérer les données des niveaux
        axios.get('http://127.0.0.1:8000/examen/displayall')
            .then(response => {
                setExamens(response.data);
            })
            .catch(error => {
                console.error('Il y a eu une erreur lors de la récupération des examens!', error);
            });
    }, []);

    // Fonction pour gérer les changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();
    
    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');

        axios.post('http://127.0.0.1:8000/Salle_examen/addSalle_examen/', formData, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        .then(response => {
            alert('Affectation ajoutée avec succès !');
            navigate('/Salle_examen-list');
            setFormData({
                id_salle: '',
                id_examen: '',
                date_salle:''
            });
        })
        .catch(error => {
            console.error('Il y a eu une erreur lors de l\'ajout de l\'affectation !', error);
            alert('Erreur lors de l\'ajout de l\'affectation.');
        });
    };

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        Ajouter une affectation
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="id_salle">Salle</Label>
                                <Input
                                    id="id_salle"
                                    name="id_salle"
                                    type="select"
                                    value={formData.id_salle}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez une salle</option>
                                    {salles.map(salle => (
                                        <option key={salle.id_salle} value={salle.id_salle}>
                                            {salle.nom_salle}  {/* Utilisez le nom du niveau ici */}
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
                                    value={formData.id_examen}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez un examen</option>
                                    {examens.map(examen => (
                                        <option key={examen.id_examen} value={examen.id_examen}>
                                            {examen.nom_examen}  {/* Utilisez le nom du module ici */}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
    <Label for="date_salle">Date and Time</Label>
    <Input
        id="date_salle"
        name="date_salle"
        type="datetime-local"  // Allows both date and time selection
        value={formData.date_salle}
        onChange={handleChange}
        required
    />
</FormGroup>

                            <Button type="submit">Ajouter l'affectation</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/Salle_examen-list">
                    <Button color="secondary">
                        Annuler
                    </Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddSalle_examen;

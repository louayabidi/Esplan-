import React, { useState } from 'react';
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

const AddBloc = () => {
    const [formData, setFormData] = useState({
        nom_bloc: '',
        nbretage: '',
    });

    const [errors, setErrors] = useState({
        nom_bloc: '',
        nbretage: ''
    });

    const [isCheckingName, setIsCheckingName] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error messages on input change
        setErrors({
            ...errors,
            [name]: ''
        });

        // Check if the name is being checked
        if (name === 'nom_bloc') {
            setIsCheckingName(true);
            checkBlocNameUnique(value);
        }
    };

    const checkBlocNameUnique = (name) => {
        axios.get(`http://127.0.0.1:8000/bloc/checkNameUnique/${name}/`)
            .then(response => {
                if (response.data.exists) {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        nom_bloc: 'Le nom du bloc existe déjà.'
                    }));
                } else {
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        nom_bloc: ''
                    }));
                }
                setIsCheckingName(false);
            })
            .catch(error => {
                console.error('Erreur lors de la vérification du nom du bloc!', error);
                setIsCheckingName(false);
            });
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = { nom_bloc: '', nbretage: '' };

        // Validate nom_bloc
        const nomBlocPattern = /^[A-M]/;
        if (!nomBlocPattern.test(formData.nom_bloc)) {
            newErrors.nom_bloc = 'Le nom du bloc doit commencer par une lettre A-M';
            isValid = false;
        }

        if (errors.nom_bloc) {
            newErrors.nom_bloc = errors.nom_bloc;
            isValid = false;
        }

        // Validate nbretage
        const nbretage = parseInt(formData.nbretage, 10);
        if (isNaN(nbretage) || nbretage < 1 || nbretage > 4) {
            newErrors.nbretage = 'Le nombre d\'étages doit être compris entre 1 et 4.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm() || isCheckingName) {
            return;
        }

        const csrftoken = getCookie('csrftoken');  // Dynamically extract CSRF token

        axios.post('http://127.0.0.1:8000/bloc/addBloc/', formData, {
            headers: {
                'X-CSRFToken': csrftoken  // Include CSRF token in the headers
            }
        })
        .then(response => {
            alert('Bloc ajouté avec succès!');
            navigate('/bloc-list');
            setFormData({
                nom_bloc: '',
                nbretage: '',
            });
        })
        .catch(error => {
            console.error('Il y a eu une erreur lors de l\'ajout du bloc!', error);
            alert('Erreur lors de l\'ajout du bloc.');
        });
    };

    const navigate = useNavigate();

    return (
        <Row>
            <Col>
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                        <i className="bi bi-bell me-2"> </i>
                        Ajouter un Bloc
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="nom_bloc">Nom</Label>
                                <Input
                                    id="nom_bloc"
                                    name="nom_bloc"
                                    value={formData.nom_bloc}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.nom_bloc && <div className="text-danger">{errors.nom_bloc}</div>}
                            </FormGroup>
                            <FormGroup>
                                <Label for="nbretage">Nombre d'étages</Label>
                                <Input
                                    id="nbretage"
                                    name="nbretage"
                                    value={formData.nbretage}
                                    onChange={handleChange}
                                    type="number"
                                    required
                                />
                                {errors.nbretage && <div className="text-danger">{errors.nbretage}</div>}
                            </FormGroup>
                            <Button type="submit">Ajouter le Bloc</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/bloc-list">
                    <Button color="secondary">
                        Annuler
                    </Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddBloc;

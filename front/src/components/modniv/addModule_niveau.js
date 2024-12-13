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

// Function to get the value of a cookie by name
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

const AddModniv = () => {
    const [formData, setFormData] = useState({
        id_module: '',
        id_niveaux: [],  // Array to hold selected niveaux
    });

    const [niveaux, setNiveaux] = useState([]);
    const [modules, setModules] = useState([]);

    useEffect(() => {
        // Fetch modules data
        axios.get('http://127.0.0.1:8000/modniv/displayAllModules') // Updated URL
            .then(response => {
                setModules(response.data);
            })
            .catch(error => {
                console.error('Error fetching modules!', error);
            });

        // Fetch niveaux data
        axios.get('http://127.0.0.1:8000/modniv/displayAllNiveaux') // Updated URL
            .then(response => {
                setNiveaux(response.data);
            })
            .catch(error => {
                console.error('Error fetching niveaux!', error);
            });
    }, []);

    // Handle form changes
    const handleModuleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNiveauChange = (e) => {
        const { value, checked } = e.target;
        let updatedNiveaux = [...formData.id_niveaux];

        if (checked) {
            updatedNiveaux.push(value);
        } else {
            updatedNiveaux = updatedNiveaux.filter(niveau => niveau !== value);
        }

        setFormData({
            ...formData,
            id_niveaux: updatedNiveaux
        });
    };

    const navigate = useNavigate();
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const csrftoken = getCookie('csrftoken');

        // Prepare the data to send, looping through selected niveaux
        const promises = formData.id_niveaux.map(niveau => 
            axios.post('http://127.0.0.1:8000/modniv/addModniv/', {
                id_module: formData.id_module,
                id_niveau: niveau,
            }, {
                headers: {
                    'X-CSRFToken': csrftoken
                }
            })
        );

        // Submit all selected niveaux
        Promise.all(promises)
            .then(() => {
                alert('Affectations ajoutées avec succès !');
                navigate('/modniv-list');
                setFormData({
                    id_module: '',
                    id_niveaux: [],
                });
            })
            .catch(error => {
                console.error('Error adding affectations!', error);
                alert('Erreur lors de l\'ajout des affectations.');
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
                                <Label for="id_module">Module</Label>
                                <Input
                                    id="id_module"
                                    name="id_module"
                                    type="select"
                                    value={formData.id_module}
                                    onChange={handleModuleChange}
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

                            <FormGroup>
                                <Label>Niveaux</Label>
                                {niveaux.map(niveau => (
                                    <div key={niveau.id_niveau} className="form-check">
                                        <Input
                                            type="checkbox"
                                            name="id_niveaux"
                                            value={niveau.id_niveau}
                                            onChange={handleNiveauChange}
                                            checked={formData.id_niveaux.includes(niveau.id_niveau)}
                                            className="form-check-input"
                                        />
                                        <Label className="form-check-label">
                                            {niveau.libelleNiv}
                                        </Label>
                                    </div>
                                ))}
                            </FormGroup>

                            <Button type="submit">Ajouter les affectations</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Link to="/modniv-list">
                    <Button color="secondary">
                        Annuler
                    </Button>
                </Link>
            </Col>
        </Row>
    );
};

export default AddModniv;

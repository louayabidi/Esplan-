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

// Configuration d'Axios pour inclure le token CSRF dans les requêtes
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// Fonction pour obtenir le token CSRF depuis les cookies
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

const AddUser = () => {
  // État du formulaire
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cin: '',
    quota: '',
    role: '',
    identifiant: '',
    roleRes: '',
    id_unite: '',
    image_user: null,
  });

  // État pour stocker les unités récupérées de l'API
  const [units, setUnits] = useState([]);
  const [cinError, setCinError] = useState('');
  const [identifiantError, setIdentifiantError] = useState('');
  const [fieldsRequired, setFieldsRequired] = useState({
    quota: false,
    identifiant: false,
    id_unite: false,
  });

  // useEffect pour récupérer les unités lors du montage du composant
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/unite/unites/') // Remplacez l'URL par celle de votre API
      .then((response) => {
        setUnits(response.data); // Assurez-vous que les données sont un tableau d'unités
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des unités!', error);
      });
  }, []);

  // Fonction pour vérifier l'unicité du CIN
const checkCinUniqueness = async (cin) => {
  try {
    // Effectuer une requête pour obtenir tous les utilisateurs
    const response = await axios.get('http://127.0.0.1:8000/api/displayall/');
    
    // Vérifier si le CIN existe parmi les utilisateurs
    const users = response.data; // Assurez-vous que cette réponse contient la liste des utilisateurs
    const cinExists = users.some(user => user.cin === cin); // Remplacez `cin` par le champ correspondant si nécessaire
    
    return !cinExists;
  } catch (error) {
    console.error('Erreur lors de la vérification du CIN', error);
    return false;
  }
};


  // Fonction pour vérifier l'unicité de l'identifiant
const checkIdentifiantUniqueness = async (identifiant) => {
  try {
    // Effectuer une requête pour obtenir tous les utilisateurs
    const response = await axios.get('http://127.0.0.1:8000/api/displayall/');
    
    // Vérifier si l'identifiant existe parmi les utilisateurs
    const users = response.data; // Assurez-vous que cette réponse contient la liste des utilisateurs
    const identifiantExists = users.some(user => user.identifiant === identifiant); // Remplacez `identifiant` par le champ correspondant si nécessaire
    
    return !identifiantExists;
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'identifiant', error);
    return false;
  }
};


  // Gestion du changement des champs du formulaire
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      // Validation pour le CIN
      if (name === 'cin') {
        if (/^\d{0,8}$/.test(value)) {
          if (value.length < 8) {
            setCinError('Le CIN doit contenir exactement 8 chiffres.');
          } else {
            checkCinUniqueness(value).then(isUnique => {
              if (!isUnique) {
                setCinError('Ce CIN est déjà utilisé.');
              } else {
                setCinError('');
              }
            });
          }
        } else {
          setCinError('Le CIN doit être un nombre de 8 chiffres.');
        }
      }

      // Validation pour l'identifiant
      if (name === 'identifiant') {
        if (/^\S+$/.test(value)) {
          checkIdentifiantUniqueness(value).then(isUnique => {
            if (!isUnique) {
              setIdentifiantError('Cet identifiant est déjà utilisé.');
            } else {
              setIdentifiantError('');
            }
          });
        }
      }

      // Validation des champs en fonction du rôle
      if (name === 'role') {
        if (value === 'employe') {
          setFormData({
            ...updatedData,
            roleRes: '', // Nullifier roleRes si rôle est employe
          });
          setFieldsRequired({
            quota: false,
            identifiant: false,
            id_unite: false,
          });
        } else if (value === 'enseignant') {
          setFieldsRequired({
            quota: true,
            identifiant: true,
            id_unite: true,
          });
        }
      }

      // Validation du sous-rôle Enseignant
      if (name === 'roleRes') {
        if (value === 'directeur') {
          setFieldsRequired({
            quota: false,
            identifiant: false,
            id_unite: false,
          });
          updatedData.quota = null;
          updatedData.identifiant = null;
          updatedData.id_unite = null;
        } else {
          setFieldsRequired({
            quota: true,
            identifiant: true,
            id_unite: true,
          });
        }
      }

      return updatedData;
    });
  };

  // Gestion du changement du fichier image
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image_user: e.target.files[0],
    });
  };

  const navigate = useNavigate();

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((formData.cin.length > 8) || (formData.cin.length < 8)) {
      setCinError('Le CIN doit contenir exactement 8 chiffres.');
      return; // Empêche l'envoi du formulaire si le CIN est invalide
    }

    if (cinError || identifiantError) {
      return; // Empêche l'envoi du formulaire si des erreurs sont présentes
    }

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      // Ajouter uniquement les champs non vides
      if (formData[key] !== '' && formData[key] !== null) {
        dataToSend.append(key, formData[key]);
      }
    });

    const csrftoken = getCookie('csrftoken');

    try {
      await axios.post('http://127.0.0.1:8000/api/register', dataToSend, {
        headers: {
          'X-CSRFToken': csrftoken,
        },
      });
      alert('Utilisateur ajouté avec succès!');
      navigate('/user-list');
      setFormData({
        username: '',
        email: '',
        password: '',
        cin: '',
        quota: '',
        role: '',
        identifiant: '',
        roleRes: '',
        id_unite: '',
        image_user: null,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur!", error);
      alert("Erreur lors de l'ajout de l'utilisateur.");
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Ajouter un Utilisateur
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="username">Nom</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Mot de passe</Label>
                <Input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="cin">CIN</Label>
                <Input
                  id="cin"
                  name="cin"
                  type="number"
                  value={formData.cin}
                  onChange={handleInputChange}
                  required
                  maxLength={8}
                  placeholder="Entrez votre CIN (8 chiffres)"
                />
                {cinError && <span className="text-danger">{cinError}</span>}
              </FormGroup>
              <FormGroup>
                <Label for="image_user">Image de l'utilisateur</Label>
                <Input
                  id="image_user"
                  name="image_user"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </FormGroup>
              <FormGroup>
                <Label for="role">Rôle</Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  type="select"
                  required
                >
                  <option value="">Sélectionnez un rôle</option>
                  <option value="employe">Employé</option>
                  <option value="enseignant">Enseignant</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="roleRes">Sous-rôle Enseignant</Label>
                <Input
                  id="roleRes"
                  name="roleRes"
                  value={formData.roleRes}
                  onChange={handleInputChange}
                  type="select"
                  required={formData.role === 'enseignant'}
                  disabled={formData.role === 'employe'} // Désactiver si rôle est employe
                >
                  <option value="">Sélectionnez un sous-rôle</option>
                  <option value="directeur">Directeur</option>
                  <option value="cup">CUP</option>
                  <option value="ro">Responsable d'option</option>
                  <option value="chef">Chef département</option>
                  <option value="enseignant">Enseignant</option>
                </Input>
              </FormGroup>
              {fieldsRequired.quota && (
                <FormGroup>
                  <Label for="quota">Quota</Label>
                  <Input
                    id="quota"
                    name="quota"
                    value={formData.quota}
                    onChange={handleInputChange}
                    type="number"
                    required
                  />
                </FormGroup>
              )}
              {fieldsRequired.identifiant && (
                <FormGroup>
                  <Label for="identifiant">Identifiant</Label>
                  <Input
                    id="identifiant"
                    name="identifiant"
                    value={formData.identifiant}
                    onChange={handleInputChange}
                    type="text"
                    required
                  />
                  {identifiantError && <span className="text-danger">{identifiantError}</span>}
                </FormGroup>
              )}
              {fieldsRequired.id_unite && (
                <FormGroup>
                  <Label for="id_unite">Unité</Label>
                  <Input
                    id="id_unite"
                    name="id_unite"
                    value={formData.id_unite}
                    onChange={handleInputChange}
                    type="select"
                    required
                  >
                    <option value="">Sélectionnez une unité</option>
                    {units.map((unit) => (
                      <option key={unit.id_unite} value={unit.id_unite}>
                        {unit.nom_unite}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              )}
              <Button type="submit" color="primary">
                Ajouter
              </Button>
              <Link to="/user-list">
                <Button color="secondary" className="ms-2">
                  Retour à la liste des utilisateurs
                </Button>
              </Link>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
    );
  };
  
  export default AddUser;
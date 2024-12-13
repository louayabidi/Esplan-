import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardTitle, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

// Configuration par défaut d'axios pour les requêtes CSRF
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

// Fonction utilitaire pour récupérer le token CSRF depuis les cookies
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

const UpdateUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    cin: '',
    quota: '',
    role: '',
    identifiant: '',
    roleRes: '',      
    id_unite: '',
    image_user: null,
  });

  const [cinError, setCinError] = useState('');
  const [identifiantError, setIdentifiantError] = useState('');
  const [fieldsRequired, setFieldsRequired] = useState({
    quota: false,
    identifiant: false,
    id_unite: false,
  });
  const [message, setMessage] = useState('');
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();
  const { user_id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      if (user_id) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/updateusers/${user_id}/`);
          setUserData(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
        }
      }
    };

    axios.get('http://127.0.0.1:8000/unite/unites/')
      .then(response => setUnits(response.data))
      .catch(error => console.error('Erreur lors de la récupération des unités!', error));

    fetchUser();
  }, [user_id]);

  // Fonction pour vérifier l'unicité du CIN
  const checkCinUniqueness = async (cin) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/displayall/');
      const users = response.data;
      const cinExists = users.some(user => user.cin === cin && user.id !== user_id); // Exclure l'utilisateur actuel
      return !cinExists;
    } catch (error) {
      console.error('Erreur lors de la vérification du CIN', error);
      return false;
    }
  };

  // Fonction pour vérifier l'unicité de l'identifiant
  const checkIdentifiantUniqueness = async (identifiant) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/displayall/');
      const users = response.data;
      const identifiantExists = users.some(user => user.identifiant === identifiant && user.id !== user_id); // Exclure l'utilisateur actuel
      return !identifiantExists;
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'identifiant', error);
      return false;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setUserData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value
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
          setUserData({
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
          updatedData.quota = '';
          updatedData.identifiant = '';
          updatedData.id_unite = '';
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

  const handleFileChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cinError || identifiantError) {
      return; // Empêche l'envoi du formulaire si des erreurs sont présentes
    }

    const formData = new FormData();
    Object.keys(userData).forEach((key) => {
      if (userData[key] instanceof File) {
        formData.append(key, userData[key]);
      } else if (userData[key] === '') {
        formData.append(key, null); // Set to null if the value is an empty string
      } else {
        formData.append(key, userData[key]);
      }
    });

    const csrftoken = getCookie('csrftoken');

    try {
      await axios.put(`http://127.0.0.1:8000/api/updateusers/${user_id}/`, formData, {
        headers: {
          'X-CSRFToken': csrftoken
        }
      });
      setMessage('Utilisateur mis à jour avec succès!');
      navigate('/user-list');
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données utilisateur:', error);
      setMessage("Échec de la mise à jour de l'utilisateur.");
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"> </i>
            Mettre à jour l'utilisateur
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="username">Nom</Label>
                <Input
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  type="email"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="cin">CIN</Label>
                <Input
                  id="cin"
                  name="cin"
                  type="number"
                  value={userData.cin}
                  onChange={handleChange}
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
                  value={userData.role}
                  onChange={handleChange}
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
                  value={userData.roleRes}
                  onChange={handleChange}
                  type="select"
                  required={userData.role === 'enseignant'}
                  disabled={userData.role === 'employe'} // Désactiver si rôle est employe
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
                    value={userData.quota}
                    onChange={handleChange}
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
                    value={userData.identifiant}
                    onChange={handleChange}
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
                    value={userData.id_unite}
                    onChange={handleChange}
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
              
              <Button type="submit">Mettre à jour l'utilisateur</Button>
            </Form>
          </CardBody>
        </Card>
        {message && <p>{message}</p>}
        <Link to="/user-list">
          <Button color="secondary">Annuler</Button>
        </Link>
      </Col>
    </Row>
  );
};

export default UpdateUser;

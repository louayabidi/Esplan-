import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup, Input } from 'reactstrap';
import { FaTrashAlt, FaPlus, FaEdit, FaSync } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Salle_examenList = () => {
  const [salleExamen, setSalleExamen] = useState([]);
  const [salles, setSalles] = useState([]);
  const [examens, setExamens] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // État pour le terme de recherche

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sallesResponse = await axios.get('http://127.0.0.1:8000/salle/displayAllS');
        setSalles(sallesResponse.data);

        const examensResponse = await axios.get('http://127.0.0.1:8000/examen/displayall/');
        setExamens(examensResponse.data);

        const sessionsResponse = await axios.get('http://127.0.0.1:8000/session/displayall/');
        setSessions(sessionsResponse.data);
        
        const salleExamenResponse = await axios.get('http://127.0.0.1:8000/Salle_examen/displayall/');
        setSalleExamen(salleExamenResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData();
  }, []);

  const handleSessionChange = (event) => {
    setSelectedSession(event.target.value);
  };

  const getSalleNameById = (id) => {
    const salle = salles.find(salle => salle.id_salle === id);
    return salle ? salle.nom_salle : 'Inconnu';
  };

  const getExamenNameById = (id) => {
    const examen = examens.find(examen => examen.id_examen === id);
    return examen ? examen.nom_examen : 'Inconnu';
  };

  const getCsrfToken = () => Cookies.get('csrftoken');

  const handleGenerateAffectation = async () => {
    try {
      const csrfToken = getCsrfToken();
      await axios.post('http://127.0.0.1:8000/Salle_examen/affectation_examens_salles/', { session_id: selectedSession }, {
        headers: {
          'X-CSRFToken': csrfToken
        },
        withCredentials: true
      });
      alert("Affectations générées avec succès");
      // Recharger la liste après la génération
      const salleExamenResponse = await axios.get('http://127.0.0.1:8000/Salle_examen/displayall/');
      setSalleExamen(salleExamenResponse.data);
    } catch (error) {
      console.error("Erreur lors de la génération des affectations:", error);
    }
  };

  const handleDelete = async (idSalle, idExamen) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette affectation ?")) {
      try {
        const csrfToken = getCsrfToken();
        await axios.delete(`http://127.0.0.1:8000/Salle_examen/delete/${idSalle}/${idExamen}/`, {
          headers: {
            'X-CSRFToken': csrfToken
          },
          withCredentials: true
        });
        alert("Affectation supprimée avec succès");
        // Recharger la liste après la suppression
        const salleExamenResponse = await axios.get('http://127.0.0.1:8000/Salle_examen/displayall/');
        setSalleExamen(salleExamenResponse.data);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'affectation:", error);
      }
    }
  };

  // Fonction pour filtrer les salles d'examen selon le terme de recherche
  const filteredSalleExamen = salleExamen.filter(item => {
    const salleName = getSalleNameById(item.id_salle).toLowerCase();
    const examenName = getExamenNameById(item.id_examen).toLowerCase();
    const dateSalle = item.date_salle.toLowerCase();
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return (
      salleName.includes(lowerCaseSearchTerm) ||
      examenName.includes(lowerCaseSearchTerm) ||
      dateSalle.includes(lowerCaseSearchTerm)
    );
  });

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Liste des affectations des examens aux salles
          </CardTitle>
          <CardBody>
            <div className="mb-3">
              <label htmlFor="sessionSelect">Sélectionner une session:</label>
              <select id="sessionSelect" value={selectedSession} onChange={handleSessionChange}>
                <option value="">--Choisir une session--</option>
                {sessions.map((session) => (
                  <option key={session.id_session} value={session.id_session}>
                    {session.nom_session}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="searchInput">Recherche:</label>
              <Input
                type="text"
                id="searchInput"
                placeholder="Rechercher ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Mettre à jour le terme de recherche
              />
            </div>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Salle</th>
                  <th>Examen</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalleExamen.map((item) => (
                  <tr key={`${item.id_salle}-${item.id_examen}`}>
                    <td>{getSalleNameById(item.id_salle)}</td>
                    <td>{getExamenNameById(item.id_examen)}</td>
                    <td>{item.date_salle}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`/Salle_examen-edit/${item.id_salle}/${item.id_examen}`}>
                          <Button color="primary">
                            <FaEdit />
                          </Button>
                        </Link>
                        <Button color="dark" onClick={() => handleDelete(item.id_salle, item.id_examen)}>
                          <FaTrashAlt />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center mt-3">
              <Link to="/addSalle_examen">
                <Button color="secondary">
                  <FaPlus /> Ajouter une affectation
                </Button>
              </Link>
              <Button color="info" className="ml-2" onClick={handleGenerateAffectation}>
                <FaSync /> Générer les affectations
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Salle_examenList;

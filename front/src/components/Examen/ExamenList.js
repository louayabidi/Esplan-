import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup, FormGroup, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import './ExamenList.css'; // Assurez-vous d'inclure votre fichier CSS
import { Link } from 'react-router-dom';

const ExamenList = () => {
  const [examens, setExamens] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [modules, setModules] = useState([]);
  const [filteredExamens, setFilteredExamens] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' ou 'desc'

  useEffect(() => {
    const fetchExamens = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/examen/displayall/');
        setExamens(response.data);
        setFilteredExamens(response.data); // Initialiser les examens filtrés avec tous les examens
      } catch (error) {
        console.error("Il y a eu une erreur!", error);
      }
    };

    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/session/displayall');
        setSessions(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des sessions:", error);
      }
    };

    const fetchModules = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/module/displayall');
        setModules(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modules:", error);
      }
    };

    fetchExamens();
    fetchSessions();
    fetchModules();
  }, []);

  useEffect(() => {
    const filtered = examens.filter(examen =>
      examen.nom_examen.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      if (sortField) {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredExamens(sorted);
  }, [searchQuery, sortField, sortOrder, examens]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field) => {
    const newOrder = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
  };

  const handleDelete = (id) => {
    // Implémentez la fonctionnalité de suppression
    console.log(`Supprimer l'examen avec l'ID : ${id}`);
  };

  const handleEdit = (id) => {
    // Implémentez la fonctionnalité de modification
    console.log(`Modifier l'examen avec l'ID : ${id}`);
  };

  const handleAdd = () => {
    // Implémentez la fonctionnalité d'ajout d'un examen
    console.log('Ajouter un nouvel examen');
  };

  // Fonction pour obtenir le nom de la session par ID
  const getSessionNameById = (id) => {
    const session = sessions.find(session => session.id_session === id);
    return session ? session.nom_session : 'Inconnu';
  };

  // Fonction pour obtenir le nom du module par ID
  const getModuleNameById = (id) => {
    const module = modules.find(module => module.id_module === id);
    return module ? module.nom_module : 'Inconnu';
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des examens
          </CardTitle>
          <CardBody>
            <FormGroup className="mb-3">
              <Input
                type="text"
                placeholder="Rechercher par examen"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </FormGroup>
            <div className="mb-3">
              <Button color="secondary" onClick={() => handleSort('nom_examen')}>
                Nom {sortField === 'nom_examen' && (sortOrder === 'asc' ? <FaSortAlphaUp /> : <FaSortAlphaDown />)}
              </Button>
            </div>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Nom de l'examen</th>
                  
                  <th>Durée</th>
                  <th>Type</th>
                  <th>Session</th>
                  <th>Module</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExamens.map(examen => (
                  <tr key={examen.id_examen}>
                    <td>{examen.nom_examen}</td>
                    
                    <td>{examen.duree_examen}</td>
                    <td>{examen.type_examen}</td>
                    <td>{getSessionNameById(examen.id_session)}</td>
                    <td>{getModuleNameById(examen.id_module)}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`/examen-up/${examen.id_examen}`}>
                          <Button color="secondary" onClick={() => handleEdit(examen.id_examen)}>
                            <FaEdit />
                          </Button>
                        </Link>
                        <Link to={`/examen-del/${examen.id_examen}`}>
                          <Button color="dark" onClick={() => handleDelete(examen.id_examen)}>
                            <FaTrashAlt />
                          </Button>
                        </Link>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center mt-3">
              <Link to="/addExamen">
                <Button color="secondary" onClick={handleAdd}>
                  <FaPlus /> Ajouter un examen
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ExamenList;

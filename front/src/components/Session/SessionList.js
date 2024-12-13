import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup, FormGroup, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SessionList.css'; // Assurez-vous d'inclure votre fichier CSS

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' ou 'desc'

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/session/displayall")
      .then(response => {
        setSessions(response.data);
        setFilteredSessions(response.data); // Initialiser les sessions filtrées avec toutes les sessions
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des sessions!", error);
      });
  }, []);

  useEffect(() => {
    const filtered = sessions.filter(session =>
      session.nom_session.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      if (sortField) {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredSessions(sorted);
  }, [searchQuery, sortField, sortOrder, sessions]);

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
    console.log(`Supprimer la session avec l'ID : ${id}`);
  };

  const handleEdit = (id) => {
    // Implémentez la fonctionnalité de modification
    console.log(`Modifier la session avec l'ID : ${id}`);
  };

  const handleAdd = () => {
    // Implémentez la fonctionnalité d'ajout d'une session
    console.log('Ajouter une nouvelle session');
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des sessions
          </CardTitle>
          <CardBody>
            <FormGroup className="mb-3">
              <Input
                type="text"
                placeholder="Rechercher par session"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </FormGroup>
            <div className="mb-3">
              <Button color="secondary" onClick={() => handleSort('nom_session')}>
                Session {sortField === 'nom_session' && (sortOrder === 'asc' ? <FaSortAlphaUp /> : <FaSortAlphaDown />)}
              </Button>
            </div>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Nom de la session</th>
                  <th>Type de session</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map(session => (
                  <tr key={session.id_session}>
                    <td>{session.nom_session}</td>
                    <td>{session.type_session}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`/session-up/${session.id_session}`}>
                          <Button color="secondary" onClick={() => handleEdit(session.id_session)}>
                            <FaEdit />
                          </Button>
                        </Link>
                        <Link to={`/session-del/${session.id_session}`}>
                          <Button color="dark" onClick={() => handleDelete(session.id_session)}>
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
              <Link to="/addSession">
                <Button color="secondary" onClick={handleAdd}>
                  <FaPlus /> Ajouter une session
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default SessionList;

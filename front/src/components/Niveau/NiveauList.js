import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup, Input, FormGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './NiveauList.css'; // Ensure to include your CSS file

const NiveauList = () => {
  const [niveaux, setNiveaux] = useState([]);
  const [filteredNiveaux, setFilteredNiveaux] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const navigate = useNavigate(); // Use navigate hook from react-router-dom

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/Niveau/niveau_list/')
      .then(response => {
        setNiveaux(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
  }, []);

  useEffect(() => {
    const filtered = niveaux.filter(niveau =>
      niveau.libelleNiv.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      if (sortField) {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredNiveaux(sorted);
  }, [searchQuery, sortField, sortOrder, niveaux]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field) => {
    const newOrder = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
  };

  const handleDelete = (id) => {
    // Redirect to the delete page
    navigate(`/deleteNiveau/${id}`);
  };

  const handleEdit = (id) => {
    // Redirect to the edit page
    navigate(`/niveau-update/${id}`);
  };

  const handleAdd = () => {
    // Redirect to the add niveau page
    navigate('/createNiveau');
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des niveaux
          </CardTitle>
          <CardBody>
            <FormGroup className="mb-3">
              <Input
                type="text"
                placeholder="Rechercher par Niveau"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </FormGroup>
            <div className="mb-3">
              <Button color="secondary" onClick={() => handleSort('libelleNiv')}>
                Niveau {sortField === 'libelleNiv' && (sortOrder === 'asc' ? <FaSortAlphaUp /> : <FaSortAlphaDown />)}
              </Button>
              <Button color="secondary" onClick={() => handleSort('nbclasseNiv')}>
                Nombre de Classes {sortField === 'nbclasseNiv' && (sortOrder === 'asc' ? <FaSortAlphaUp /> : <FaSortAlphaDown />)}
              </Button>
            </div>
            <Table className="modern-table" responsive>
              <thead>
                <tr>

                  <th>Niveau</th>
                  <th>Spécialité</th>
                  <th>Nombre de Classes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNiveaux.map(niveau => (
                  <tr key={niveau.id_niveau}>
 
                    <td>{niveau.libelleNiv}</td>
                    <td>{niveau.specialite}</td>
                    <td>{niveau.nbclasseNiv}</td>
                    <td>
                      <ButtonGroup>
                        <Button color="secondary" onClick={() => handleEdit(niveau.id_niveau)}>
                          <FaEdit />
                        </Button>
                        <Button color="dark" onClick={() => handleDelete(niveau.id_niveau)}>
                          <FaTrashAlt />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center mt-3">
              <Button color="secondary" onClick={handleAdd}>
                <FaPlus /> Ajouter un niveau
              </Button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default NiveauList;

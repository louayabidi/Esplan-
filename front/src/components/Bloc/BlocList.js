import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup, FormGroup, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import './BlocList.css'; // Assurez-vous d'inclure votre fichier CSS
import { Link } from 'react-router-dom';

const BlocList = () => {
  const [blocs, setBlocs] = useState([]);
  const [filteredBlocs, setFilteredBlocs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' ou 'desc'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlocs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/bloc/displayAllBlocs/');
        setBlocs(response.data);
        setFilteredBlocs(response.data); // Initialiser avec tous les blocs
        setLoading(false);
      } catch (error) {
        console.error("Il y a eu une erreur!", error);
      }
    };

    fetchBlocs();
  }, []);

  useEffect(() => {
    const filtered = blocs.filter(bloc =>
      bloc.nom_bloc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      if (sortField) {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredBlocs(sorted);
  }, [searchQuery, sortField, sortOrder, blocs]);

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
    console.log(`Supprimer le bloc avec l'ID : ${id}`);
  };

  const handleEdit = (id) => {
    // Implémentez la fonctionnalité de modification
    console.log(`Modifier le bloc avec l'ID : ${id}`);
  };

  const handleAdd = () => {
    // Implémentez la fonctionnalité d'ajout d'un bloc
    console.log('Ajouter un nouveau bloc');
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des blocs 
          </CardTitle>
          <CardBody>
            {loading ? (
              <div>Chargement...</div>
            ) : (
              <>
                <FormGroup className="mb-3">
                  <Input
                    type="text"
                    placeholder="Rechercher par bloc"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </FormGroup>
                <div className="mb-3">
                  <Button color="secondary" onClick={() => handleSort('nom_bloc')}>
                    Nom {sortField === 'nom_bloc' && (sortOrder === 'asc' ? <FaSortAlphaUp /> : <FaSortAlphaDown />)}
                  </Button>
                </div>
                <Table className="modern-table" responsive>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Nombre d'étages</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlocs.map(bloc => (
                      <tr key={bloc.id_bloc}>
                        <td>{bloc.nom_bloc}</td>
                        <td>{bloc.nbretage}</td>
                        <td>
                          <ButtonGroup>
                            <Link to={`/bloc-up/${bloc.id_bloc}`}>
                              <Button color="secondary" onClick={() => handleEdit(bloc.id_bloc)}>
                                <FaEdit />
                              </Button>
                            </Link>
                            <Link to={`/bloc-del/${bloc.id_bloc}`}>
                              <Button color="dark" onClick={() => handleDelete(bloc.id_bloc)}>
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
                  <Link to="/addBloc">
                    <Button color="secondary" onClick={handleAdd}>
                      <FaPlus /> Ajouter un bloc
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default BlocList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup, FormGroup, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import './SalleList.css'; // Assurez-vous d'inclure votre fichier CSS
import { Link } from 'react-router-dom';

const SalleList = () => {
  const [salles, setSalles] = useState([]);
  const [blocs, setBlocs] = useState([]);
  const [examens, setExamens] = useState([]);
  const [filteredSalles, setFilteredSalles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/salle/displayAllS');
        setSalles(response.data);
        setFilteredSalles(response.data); // Initialiser les salles filtrées avec toutes les salles
      } catch (error) {
        console.error("Il y a eu une erreur!", error);
      }
    };

    const fetchBlocs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/bloc/displayAllBlocs');
        setBlocs(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des blocs:", error);
      }
    };

    const fetchExamens = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/examen/displayall');
        setExamens(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des examens:", error);
      }
    };

    fetchSalles();
    fetchBlocs();
    fetchExamens();
    setLoading(false);
  }, []);

  useEffect(() => {
    const filtered = salles.filter(salle =>
      salle.nom_salle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      if (sortField) {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredSalles(sorted);
  }, [searchQuery, sortField, sortOrder, salles]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field) => {
    const newOrder = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
  };

  const handleDelete = (id) => {
    console.log(`Supprimer la salle avec l'ID : ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Modifier la salle avec l'ID : ${id}`);
  };

  const handleAdd = () => {
    console.log('Ajouter une nouvelle salle');
  };

  const getBlocNameById = (id) => {
    const bloc = blocs.find(bloc => bloc.id_bloc === id);
    return bloc ? bloc.nom_bloc : 'Inconnu';
  };

  const getExamNameById = (id) => {
    const exam = examens.find(exam => exam.id_examen === id);
    return exam ? exam.nom_examen : 'Inconnu';
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des salles 
          </CardTitle>
          <CardBody>
            {loading ? (
              <div>Chargement...</div>
            ) : (
              <>
                <FormGroup className="mb-3">
                  <Input
                    type="text"
                    placeholder="Rechercher par salle"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </FormGroup>
                <div className="mb-3">
                  <Button color="secondary" onClick={() => handleSort('nom_salle')}>
                    Nom {sortField === 'nom_salle' && (sortOrder === 'asc' ? <FaSortAlphaUp /> : <FaSortAlphaDown />)}
                  </Button>
                </div>
                <Table className="modern-table" responsive>
                  <thead>
                    <tr>
                      <th>Nom de la Salle</th>
                      <th>Capacité</th>
                      <th>Disponibilité</th>
                      <th>Bloc</th>
                      <th>Examen</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSalles.map(salle => (
                      <tr key={salle.id_salle}>
                        <td>{salle.nom_salle}</td>
                        <td>{salle.capacite}</td>
                        <td>{salle.dispo ? 'Oui' : 'Non'}</td>
                        <td>{getBlocNameById(salle.id_bloc)}</td>
                        <td>{getExamNameById(salle.id_examen)}</td>
                        <td>
                          <ButtonGroup>
                            <Link to={`/salle-up/${salle.id_salle}`}>
                              <Button color="secondary" onClick={() => handleEdit(salle.id_salle)}>
                                <FaEdit />
                              </Button>
                            </Link>
                            <Link to={`/salle-del/${salle.id_salle}`}>
                              <Button color="dark" onClick={() => handleDelete(salle.id_salle)}>
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
                  <Link to="/addSalle">
                    <Button color="secondary" onClick={handleAdd}>
                      <FaPlus /> Ajouter une salle
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

export default SalleList;
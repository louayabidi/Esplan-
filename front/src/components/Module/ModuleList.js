import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup, FormGroup, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './ModuleList.css'; // Assurez-vous d'inclure votre fichier CSS

const ModuleList = () => {
  const [modules, setModules] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' ou 'desc'

  useEffect(() => {
    // Récupérer tous les modules
    axios.get('http://127.0.0.1:8000/module/displayall/')
      .then(response => {
        setModules(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des modules!", error);
      });

    // Récupérer tous les niveaux
    axios.get('http://127.0.0.1:8000/Niveau/displayallNiveaux/')
      .then(response => {
        setNiveaux(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur lors de la récupération des niveaux!", error);
      });
  }, []);

  useEffect(() => {
    // Filtrer les modules en fonction de la recherche
    const filtered = modules.filter(module =>
      module.nom_module.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Trier les modules filtrés en fonction du champ et de l'ordre
    const sorted = filtered.sort((a, b) => {
      if (sortField) {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredModules(sorted);
  }, [modules, searchQuery, sortField, sortOrder]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field) => {
    const newOrder = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
  };

  const handleDelete = (id) => {
    // Implémenter la fonctionnalité de suppression
    console.log(`Supprimer le module avec ID: ${id}`);
  };

  const handleEdit = (id) => {
    // Implémenter la fonctionnalité de modification
    console.log(`Modifier le module avec ID: ${id}`);
  };

  const handleAdd = () => {
    // Implémenter la fonctionnalité d'ajout
    console.log('Ajouter un nouveau module');
  };

  // Fonction pour obtenir le libelleNiv basé sur id_niveau
  const getLibelleNiv = (id) => {
    const niveau = niveaux.find(niveau => niveau.id_niveau === id);
    return niveau ? niveau.libelleNiv : 'Inconnu';
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des modules
          </CardTitle>
          <CardBody>
            <FormGroup className="mb-3">
              <Input
                type="text"
                placeholder="Rechercher par module"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </FormGroup>
            <div className="mb-3">
              <Button color="secondary" onClick={() => handleSort('nom_module')}>
                Module {sortField === 'nom_module' && (sortOrder === 'asc' ? <FaSortAlphaUp /> : <FaSortAlphaDown />)}
              </Button>
            </div>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Nom du module</th>
                  <th>Durée du module (en heure)</th>
                  <th>Niveau</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredModules.map(module => (
                  <tr key={module.id_module}>
                    <td>{module.nom_module}</td>
                    <td>{module.duree_module}</td>
                    <td>{getLibelleNiv(module.id_niveau)}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`/module-up/${module.id_module}`}>
                          <Button color="secondary" onClick={() => handleEdit(module.id_module)}>
                            <FaEdit />
                          </Button>
                        </Link>
                        <Link to={`/module-del/${module.id_module}`}>
                          <Button color="dark" onClick={() => handleDelete(module.id_module)}>
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
              <Link to="/addModule">
                <Button color="secondary" onClick={handleAdd}>
                  <FaPlus /> Ajouter un module
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ModuleList;

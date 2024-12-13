import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup } from 'reactstrap';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import './Module_niveauList.css';
import { Link } from 'react-router-dom';

const Module_niveauList = () => {
  const [module_niveau, setModule_niveau] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    // Récupérer les données de Module_niveau
    axios.get('http://127.0.0.1:8000/Module_niveau/displayall/')
      .then(response => {
        setModule_niveau(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });

    // Récupérer les données des modules
    const fetchModules = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/module/displayall');
        setModules(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modules:", error);
      }
    };

    // Récupérer les données des niveaux
    const fetchNiveau = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/Niveau/displayallNiveaux');
        setNiveaux(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des niveaux:", error);
      }
    };

    fetchNiveau();
    fetchModules();
  }, []);

  // Fonction pour obtenir le nom du module par ID
  const getModuleNameById = (id) => {
    const module = modules.find(module => module.id_module === id);
    return module ? module.nom_module : 'Inconnu';
  };

  // Fonction pour obtenir le nom du niveau par ID
  const getNiveauNameById = (id) => {
    const niveau = niveaux.find(niveau => niveau.id_niveau === id);
    return niveau ? niveau.libelleNiv : 'Inconnu';
  };

  // Fonction pour gérer la suppression
  const handleDelete = (id_module, id_niveau) => {
    console.log(`Supprimer l'affectation avec ID Module: ${id_module} et ID Niveau: ${id_niveau}`);
  };

  // Fonction pour ajouter une nouvelle affectation
  const handleAdd = () => {
    console.log('Ajouter une nouvelle affectation');
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Liste des affectations des modules aux niveaux
          </CardTitle>
          <CardBody>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Module</th>
                  <th>Niveau</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {module_niveau.map((item) => (
                  <tr key={`${item.id_module}-${item.id_niveau}`}>
                    <td>{getModuleNameById(item.id_module)}</td>
                    <td>{getNiveauNameById(item.id_niveau)}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`/Module_niveau-del/${item.id_module}`}>
                          <Button color="dark" onClick={() => handleDelete(item.id_module, item.id_niveau)}>
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
              <Link to="/addModule_niveau">
                <Button color="secondary" onClick={handleAdd}>
                  <FaPlus /> Ajouter une affectation
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Module_niveauList;

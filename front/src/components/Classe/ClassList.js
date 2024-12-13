import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup, Input, FormGroup } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ClassList.css'; // Ensure to include your CSS file

const NiveauList = () => {
  const [classes, setClasses] = useState([]);
  const [nivData, setNivData] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [niveauSearchQuery, setNiveauSearchQuery] = useState(''); // Separate search for Niveau
  const [classSearchQuery, setClassSearchQuery] = useState('');   // Separate search for Classes
  const [expandedNiveau, setExpandedNiveau] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch classes
    axios.get('http://127.0.0.1:8000/Classe/classe_list/')
      .then(response => {
        const sortedClasses = response.data.sort((a, b) => a.libelleClasse.localeCompare(b.libelleClasse));
        setClasses(sortedClasses);
        setFilteredClasses(sortedClasses); // Initialize filtered classes
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
    
    // Fetch niveau data
    axios.get('http://127.0.0.1:8000/Niveau/niveau_list/') // Update the URL to your API endpoint
      .then(response => {
        setNivData(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur avec les niveaux!", error);
      });
  }, []);

  useEffect(() => {
    // Filter and sort classes based on class search query
    const filtered = classes.filter(cls => {
      const niveau = getNiveauAndSpecialite(cls.id_niveau).toLowerCase();
      const combinedNiveauClasse = `${niveau} ${cls.libelleClasse}`.toLowerCase();
      return combinedNiveauClasse.includes(classSearchQuery.toLowerCase().replace(/\s+/g, ''));
    });

    const sorted = filtered.sort((a, b) => a.libelleClasse.localeCompare(b.libelleClasse));

    setFilteredClasses(sorted);
  }, [classSearchQuery, classes]);

  const handleNiveauSearchChange = (e) => {
    setNiveauSearchQuery(e.target.value);
  };

  const handleClassSearchChange = (e) => {
    setClassSearchQuery(e.target.value);
  };

  const handleDelete = (id) => {
    navigate(`/deleteClass/${id}`);
  };

  const handleEdit = (id) => { 
    navigate(`/class-update/${id}`);
  };

  const handleAdd = () => {
    navigate('/createClass');
  };

  const getNiveauAndSpecialite = (idNiveau) => {
    const niveau = nivData.find(n => n.id_niveau === idNiveau);
    return niveau ? `${niveau.libelleNiv || ''} ${niveau.specialite || ''}` : 'N/A';
  };

  const toggleNiveau = (idNiveau) => {
    setExpandedNiveau(expandedNiveau === idNiveau ? null : idNiveau);
  };

  const getClassesByNiveau = (idNiveau) => {
    return classes.filter(cls => cls.id_niveau === idNiveau).sort((a, b) => a.libelleClasse.localeCompare(b.libelleClasse));
  };

  const getClassesCountByNiveau = (idNiveau) => {
    return getClassesByNiveau(idNiveau).length;
  };

  // Sort niveaux by the number of classes
  const sortedNivData = [...nivData].sort((a, b) => {
    const countA = getClassesCountByNiveau(a.id_niveau);
    const countB = getClassesCountByNiveau(b.id_niveau);
    return countB - countA;
  });

  return (
    <div>
      {/* Niveau List */}
      <Row>
        <Col lg="12">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-card-text me-2"> </i>
              Liste des Niveaux
            </CardTitle>
            <CardBody>
              <FormGroup className="mb-3">
                <Input
                  type="text"
                  placeholder="Rechercher par Niveau"
                  value={niveauSearchQuery}
                  onChange={handleNiveauSearchChange}
                />
              </FormGroup>
              <Table className="modern-table" responsive>
                <thead>
                  <tr>
                    <th>Niveau et Classe</th>
                    <th>Nombre de Classes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedNivData.filter(niv =>
                    (`${niv.libelleNiv} ${niv.specialite || ''}`).toLowerCase().includes(niveauSearchQuery.toLowerCase())
                  ).map(niv => (
                    <React.Fragment key={niv.id_niveau}>
                      <tr className="niveau-row" onClick={() => toggleNiveau(niv.id_niveau)} style={{ cursor: 'pointer', backgroundColor: '#f8d7da', color: '#721c24', fontWeight: 'bold' }}>
                        <td>
                          {niv.libelleNiv} {niv.specialite || ''}
                        </td>
                        <td>{getClassesCountByNiveau(niv.id_niveau)}</td>
                        <td>
                          <Button color="danger" size="sm" onClick={() => toggleNiveau(niv.id_niveau)}>
                            <FaSortAlphaUp /> Consulter Classes
                          </Button>
                        </td>
                      </tr>
                      {expandedNiveau === niv.id_niveau && (
                        <tr>
                          <td colSpan="3">
                            <Table className="modern-table" responsive>
                              <thead>
                                <tr>
                                  <th>Niveau et Classe</th>
                                  <th>Nombre d'Étudiants</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {getClassesByNiveau(niv.id_niveau).map(cls => (
                                  <tr key={cls.id_classe}>
                                    <td>{getNiveauAndSpecialite(cls.id_niveau)} {cls.libelleClasse}</td>
                                    <td>{cls.NbEtudiantClasse}</td>
                                    <td>
                                      <ButtonGroup>
                                        <Button color="secondary" onClick={() => handleEdit(cls.id_classe)}>
                                          <FaEdit />
                                        </Button>
                                        <Button color="dark" onClick={() => handleDelete(cls.id_classe)}>
                                          <FaTrashAlt />
                                        </Button>
                                      </ButtonGroup>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
              <div className="text-center mt-3">
                <Button color="secondary" onClick={handleAdd}>
                  <FaPlus /> Ajouter une classe
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Classes List */}
      <Row>
        <Col lg="12">
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-card-text me-2"> </i>
              Liste des Classes
            </CardTitle>
            <CardBody>
              <FormGroup className="mb-3">
                <Input
                  type="text"
                  placeholder="Rechercher par Niveau et Classe (ex: 3A, 3A6)"
                  value={classSearchQuery}
                  onChange={handleClassSearchChange}
                />
              </FormGroup>
              <Table className="modern-table" responsive>
                <thead>
                  <tr>
                    <th>Niveau et Classe</th>
                    <th>Nombre d'Étudiants</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClasses.map(cls => (
                    <tr key={cls.id_classe}>
                      <td>{getNiveauAndSpecialite(cls.id_niveau)} {cls.libelleClasse}</td>
                      <td>{cls.NbEtudiantClasse}</td>
                      <td>
                        <ButtonGroup>
                          <Button color="secondary" onClick={() => handleEdit(cls.id_classe)}>
                            <FaEdit />
                          </Button>
                          <Button color="dark" onClick={() => handleDelete(cls.id_classe)}>
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
                  <FaPlus /> Ajouter une classe
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NiveauList;

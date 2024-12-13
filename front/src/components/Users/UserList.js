import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, ButtonGroup, FormGroup, Input } from 'reactstrap';
import { FaEdit, FaTrashAlt, FaPlus, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import './UserList.css'; // Ensure to include your CSS file
import { Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' ou 'desc'

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/displayall')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
        setLoading(false);
      });

    const fetchUnites = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/unite/unites/');
        setUnits(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des unités:", error);
      }
    };

    fetchUnites();
  }, []);

  const getUniteNameById = (id) => {
    const unit = units.find(unit => unit.id_unite === id);
    return unit ? unit.nom_unite : '';
  };
  useEffect(() => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      if (sortField) {
        if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredUsers(sorted);
  }, [searchQuery, sortField, sortOrder, users]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field) => {
    const newOrder = (sortField === field && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
  };
  const handleDelete = (id) => {
    console.log(`Supprimer l'utilisateur avec l'ID : ${id}`);
    // Implémentez la fonctionnalité de suppression ici
  };

  const handleAdd = () => {
    console.log('Ajouter un nouvel utilisateur');
    // Implémentez la fonctionnalité d'ajout ici
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Liste des utilisateurs
          </CardTitle>
          <CardBody>
          <FormGroup className="mb-3">
              <Input
                type="text"
                placeholder="Rechercher par utilisateur"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </FormGroup>
            <div className="mb-3">
              <Button color="secondary" onClick={() => handleSort('username')}>
                Nom d'utilisateur {sortField === 'username' && (sortOrder === 'asc' ? <FaSortAlphaUp /> : <FaSortAlphaDown />)}
              </Button>
            </div>
            <Table className="modern-table" responsive>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>CIN</th>
                  <th>Role</th>
                  <th>Role Enseignant</th>
                  <th>Identifiant</th>
                  <th>Quota</th>
                  <th>Unité</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.user_id}>
                    <td>
                      <img 
                        src={`http://127.0.0.1:8000${user.image_user}`} 
                        className="user-image"
                        alt=''
                      />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.cin}</td>
                    <td>{user.role}</td>
                    <td>{user.roleRes}</td>
                    <td>{user.identifiant}</td>
                    <td>{user.quota}</td>
                    <td>{getUniteNameById(user.id_unite)}</td>
                    <td>
                      <ButtonGroup>
                        <Link to={`/user-up/${user.user_id}`}>
                          <Button color="secondary">
                            <FaEdit />
                          </Button>
                        </Link>

                        <Link to={`/user-del/${user.user_id}`}>
                          <Button color="dark" onClick={() => handleDelete(user.user_id)}>
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
              <Link to="/addUser">
                <Button color="secondary" onClick={handleAdd}>
                  <FaPlus /> Ajouter un utilisateur
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default UserList;

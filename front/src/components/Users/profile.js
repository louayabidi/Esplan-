import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, CardTitle, CardBody, ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import './profile.css'; // Assuming you are using a CSS file for styles

// Ensure CSRF setup for axios
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000" // Adjust this base URL if needed
});

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null); // Holds user data
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [error, setError] = useState(null); // Tracks errors

  useEffect(() => {
    client.get("/api/user")
      .then(function (res) {
        console.log("User data:", res.data); 
        setCurrentUser(res.data.user); 
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(function (error) {
        console.error("Error fetching user info:", error.response ? error.response.data : error.message);
        setError("Error fetching user info"); // Set error message
        setLoading(false); // Set loading to false on error
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner color="primary" /> {/* Show a spinner while loading */}
        <p>Chargement des informations utilisateur...</p>
      </div>
    ); 
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>; // Display error message
  }

  const defaultImageUrl = '/path/to/default/avatar.jpg'; // Add a path to your default image

  return (
    <Row className="justify-content-center">
      <Col md="8" lg="6">
        <Card className="profile-card">
          <CardBody>
            <CardTitle tag="h5" className="text-center">
              <i className="bi bi-person-circle me-2"></i>
              {currentUser ? `Salut, ${currentUser.username}` : 'Guest'}
            </CardTitle>
            <div className="text-center mb-3">
              <div className="profile-image-container">
                <img
                  src={currentUser && currentUser.image_user ? `http://127.0.0.1:8000${currentUser.image_user}` : defaultImageUrl}
                  alt="User Avatar"
                  className="profile-image"
                />
              </div>
            </div>
            <ListGroup>
              <ListGroupItem className="d-flex justify-content-between align-items-center">
                <strong>Nom :</strong>
                <span>{currentUser ? currentUser.username : 'Aucun utilisateur trouvé.'}</span>
              </ListGroupItem>
              <ListGroupItem className="d-flex justify-content-between align-items-center">
                <strong>Email :</strong>
                <span>{currentUser ? currentUser.email : 'Aucun utilisateur trouvé.'}</span>
              </ListGroupItem>
              <ListGroupItem className="d-flex justify-content-between align-items-center">
                <strong>CIN :</strong>
                <span>{currentUser ? currentUser.cin : 'Aucun utilisateur trouvé.'}</span>
              </ListGroupItem>
              <ListGroupItem className="d-flex justify-content-between align-items-center">
                <strong>Quota :</strong>
                <span>{currentUser ? currentUser.quota : 'Aucun utilisateur trouvé.'}</span>
              </ListGroupItem>
              <ListGroupItem className="d-flex justify-content-between align-items-center">
                <strong>Rôle :</strong>
                <span>{currentUser ? currentUser.role : 'Aucun utilisateur trouvé.'}</span>
              </ListGroupItem>
              <ListGroupItem className="d-flex justify-content-between align-items-center">
                <strong>Identifiant :</strong>
                <span>{currentUser ? currentUser.identifiant : 'Aucun utilisateur trouvé.'}</span>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;

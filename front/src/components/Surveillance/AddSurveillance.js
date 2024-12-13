import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

const AddSurveillance = () => {
  const [profName, setProfName] = useState('');
  const [date, setDate] = useState('');
  const [room, setRoom] = useState('');
  const [exam, setExam] = useState('');
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSurveillance = {
      prof_name: profName,
      date: date,
      room: room,
      exam_name: exam,
    };

    axios.post('http://127.0.0.1:8000/Surveillance/add-surveillance/', newSurveillance)
      .then(response => {
        console.log('Surveillance ajoutée:', response.data);
        history.push('/surveillances'); // Redirect to surveillance list after adding
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de la surveillance:', error);
      });
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            Ajouter une nouvelle surveillance
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="profName">Nom du Professeur</Label>
                <Input
                  type="text"
                  id="profName"
                  value={profName}
                  onChange={(e) => setProfName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="room">Salle</Label>
                <Input
                  type="text"
                  id="room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="exam">Examen</Label>
                <Input
                  type="text"
                  id="exam"
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
                  required
                />
              </FormGroup>
              <Button type="submit" color="primary">Ajouter</Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AddSurveillance;

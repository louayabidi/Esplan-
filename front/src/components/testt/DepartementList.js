import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DepartementList = () => {
  const [departements, setDepartements] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/departement/')
      .then(response => {
        setDepartements(response.data);
      })
      .catch(error => {
        console.error("Il y a eu une erreur!", error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des départements</h1>
      <ul>
        {departements.map(dept => (
          <li key={dept.idDEP}>{dept.nomDEP}</li>
        ))}
      </ul>
    </div>
  );
};

export default DepartementList;

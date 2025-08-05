// src/components/HospitalAdminList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

const HospitalAdminList = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios.get('https://symptom-checkers.onrender.com/api/hospitaladmins')
      .then(response => {
        setAdmins(response.data);
      })
      .catch(error => {
        console.error("Error fetching hospital admins:", error);
      });
  }, []);

  return (
    <Container className="mt-4">
      <h4>Hospital IT Admin List</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Hospital</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.username}</td>
              <td>{admin.hospitalname}</td>
              <td>{admin.location}</td>
              <td>{admin.contact}</td>
              <td>{admin.email}</td>
              <td>{admin.isactive}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HospitalAdminList;

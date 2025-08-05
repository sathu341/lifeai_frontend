import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Row, Col } from 'react-bootstrap';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get("https://symptom-checkers.onrender.com/api/get-doctors")
      .then(res => {
        setDoctors(res.data);
      })
      .catch(err => {
        console.error("Error fetching doctors", err);
      });
  }, []);

  return (
    <Container className='mt-5'>
      <Row>
        <Col>
          <h3 className='text-center mb-4'>Doctor List</h3>
          <Table striped bordered hover responsive variant='dark'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Reg. No</th>
                <th>Department</th>
                <th>Qualification</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.id}</td>
                  <td>{doc.username}</td>
                  <td>{doc.name}</td>
                  <td>{doc.contact}</td>
                  <td>{doc.email}</td>
                  <td>{doc.reg_no}</td>
                  <td>{doc.department}</td>
                  <td>{doc.qualification}</td>
                  <td>
                    {doc.photo ? (
                      <img src={`https://symptom-checkers.onrender.com/${doc.photo}`} alt="Doctor" width="50" height="50" />
                    ) : 'N/A'} 
                  <a href={`https://symptom-checkers.onrender.com/${doc.photo}`}>Image</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

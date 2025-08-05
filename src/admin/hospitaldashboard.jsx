import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './hospitaldashboard.css';
import { Outlet } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="dashboard-wrapper">
      <motion.aside
        className="sidebar"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2>LifeAI</h2>
        <ul>
          <li><a href="/hospital-dashboard/add-doctor">Add Doctors</a></li>
          <li><a href="/hospital-dashboard/view-doctor">View Doctors</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </motion.aside>

      <motion.main
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <Container fluid>
          <h2 className="text-light mb-4">Hospital Admin Dashboard</h2>
          <Row>
            <Col md={4}>
              <Card bg="dark" text="white" className="mb-3 shadow-lg">
                <Card.Body>
                  <Card.Title>IT Admins</Card.Title>
                  <Card.Text>Total: 5</Card.Text>
                  <Button variant="outline-light">Manage</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card bg="dark" text="white" className="mb-3 shadow-lg">
                <Card.Body>
                  <Card.Title>Doctors</Card.Title>
                  <Card.Text>Total: 20</Card.Text>
                  <Button variant="outline-light" as="a" href="/hospital-dashboard/view-doctor">View</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card bg="dark" text="white" className="mb-3 shadow-lg">
                <Card.Body>
                  <Card.Title>Logout</Card.Title>
                  <Card.Text>Securely logout from system.</Card.Text>
                  <Button variant="danger">Logout</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
            <Outlet/>
            </Col>
          </Row>
        </Container>
      </motion.main>
    </div>
  );
}

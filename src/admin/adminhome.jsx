// src/components/AdminDashboard.jsx
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Outlet, useNavigate } from 'react-router-dom';
import './adminpage.css'; // Make sure this file is updated

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/admin');
  };

  return (
    <Container fluid className="admin-dashboard-container">
      <Row>
        <Col>
          <h2 className="text-center my-4 dashboard-title">Admin Dashboard</h2>
        </Col>
      </Row>
      <Row className="g-4 justify-content-center px-3">
        {[
          {
            title: "Add Hospital Admin",
            text: "Add a new hospital/IT system administrator.",
            action: () => navigate('/admindashboard/add-it-admin'),
            variant: 'info'
          },
          {
            title: "View Doctors",
            text: "View all registered doctors.",
            action: () => navigate('/view-doctors'),
            variant: 'info'
          },
          {
            title: "Hospital Admin List",
            text: "View all registered hospital admin.",
            action: () => navigate('/admindashboard/hospital-admin'),
            variant: 'info'
          },
          {
            title: "Logout",
            text: "End admin session and logout securely.",
            action: handleLogout,
            variant: 'danger'
          }
        ].map((card, i) => (
          <Col key={i} xs={12} md={6} lg={4}>
            <motion.div whileHover={{ scale: 1.05 }} className="motion-card">
              <Card className="text-center glass-card">
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                  <Button variant={card.variant} onClick={card.action}>
                    {card.title.includes('View') ? 'View' : card.title}
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Col>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

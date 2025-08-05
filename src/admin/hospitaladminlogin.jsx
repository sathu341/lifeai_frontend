import { useState } from 'react';
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './hospitalAdminLogin.css';
import { useNavigate } from 'react-router-dom';

export default function HospitalAdminLogin() {
  const nav=useNavigate()
  const [admin, setAdmin] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://symptom-checkers.onrender.com/api/hospital-admin-login', {
        itadmindetail: [admin.username, admin.password],
      });
      sessionStorage.setItem('hospitalid',res.data.admin_id)
      toast.success(res.data.message,{
        onClose:()=>nav("/hospital-dashboard")
      });
      setAdmin({ username: '', password: '' });

      // Redirect or further action here
    } catch (err) {
      const msg = err.response?.data?.detail || "Login failed";
      toast.error(msg);
    }
  };

  return (
    <div className="admin-dark-wrapper">
      <Container fluid className="admin-login-container">
        <Row className="vh-100 justify-content-center align-items-center">
          <Col xs={11} sm={8} md={5} lg={4}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="p-4 rounded bg-dark shadow-lg login-box"
            >
              <h3 className="text-center text-light mb-4">Hospital Admin Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <FloatingLabel label="Username" controlId="username">
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      value={admin.username}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-4">
                  <FloatingLabel label="Password" controlId="password">
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={admin.password}
                      onChange={handleChange}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Button type="submit" variant="outline-light" className="w-100">
                  Login
                </Button>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
}

import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ItAdminRegister() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    hospitalname: '',
    location: '',
    contact: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      itadmindetail: [
        formData.username,
        formData.password,
        formData.hospitalname,
        formData.location,
        formData.contact,
        formData.email
      ]
    };
    console.log(formData)

    try {
      const res = await axios.post('https://symptom-checkers.onrender.com/api/registeritadmin', payload);
      toast.success(res.data.message);
      setFormData({
        username: '',
        password: '',
        hospitalname: '',
        location: '',
        contact: '',
        email: ''
      });
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed');
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="shadow-lg p-4 bg-white rounded"
          >
            <h3 className="mb-4 text-center text-info">IT Admin Registration</h3>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="username" label="Username" className="mb-3">
                <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
              </FloatingLabel>

              <FloatingLabel controlId="password" label="Password" className="mb-3">
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
              </FloatingLabel>

              <FloatingLabel controlId="hospitalname" label="Hospital Name" className="mb-3">
                <Form.Control type="text" name="hospitalname" value={formData.hospitalname} onChange={handleChange} required />
              </FloatingLabel>

              <FloatingLabel controlId="location" label="Location" className="mb-3">
                <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
              </FloatingLabel>

              <FloatingLabel controlId="contact" label="Contact Number" className="mb-3">
                <Form.Control type="tel" name="contact" value={formData.contact} onChange={handleChange} required />
              </FloatingLabel>

              <FloatingLabel controlId="email" label="Email" className="mb-4">
                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
              </FloatingLabel>

              <Button type="submit" variant="primary" className="w-100">
                Register IT Admin
              </Button>
            </Form>
          </motion.div>
        </Col>
      </Row>
      <ToastContainer position="top-center" theme="colored" />
    </Container>
  );
}

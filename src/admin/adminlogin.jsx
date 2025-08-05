import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './adminlogin.css'; // Optional: You can style here
import axios  from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
export default function AdminLogin() {
    const nav=useNavigate()
    const [admin,setAdmin]=useState({})
    const changeValue=(e)=>{
        setAdmin({...admin,[e.target.name]:e.target.value})
        
    }
    const submitHandler = (e) => {
  e.preventDefault();
  const payload = { admindetail: [admin.username, admin.password] };
  console.log("Sending:", {"admindetail": [admin.username, admin.password]})

  axios.post("https://symptom-checkers.onrender.com/api/adminlogin/", admin)
    .then(res => {
      setAdmin({ username: '', password: '' });
      toast.success(
        "Login Successful",{
        autoClose: 1500,
      onClose: () => {
        nav("/admindashboard");
      }});
    })
    .catch(err => {
      toast.error("Login Failed");
      console.error("Error:", err.response?.data || err.message);
    });
};

  return (
    <Container fluid className="admin-login-container">
      <Row className="vh-100 justify-content-center align-items-center">
        <Col xs={10} sm={8} md={5} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="p-4 rounded shadow bg-white"
          >
            <h3 className="text-center mb-4">Admin Login</h3>
            <Form method="post" onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <FloatingLabel controlId="adminUsername" label="Username">
                  <Form.Control type="text"  placeholder="Username" name="username" onChange={(e)=>{changeValue(e)}} required />
                   
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-4">
                    <FloatingLabel controlId='password' label="password">
                  <Form.Control type="password"  placeholder="Password" name="password" onChange={(e)=>{changeValue(e)}} />
              </FloatingLabel>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </motion.div>
        </Col>
      </Row>
      <ToastContainer theme='dark' position='top-center'/>
    </Container>
  );
}

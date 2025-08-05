import logo from '../images/LifeAILogo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { easeInOut, motion } from 'framer-motion';

export default function LoginPage() {
  const nav = useNavigate();

  const handleSubmit = () => {
    toast.success("Successfully Logged In", {
      position: "top-center",
      autoClose: 1500,
      onClose: () => {
        nav("/doctor");
      }
    });
  };

  return (
    <Container fluid className="login-background">
      <Row className="vh-100 justify-content-center align-items-center">
        <Col md={6} lg={5}>
          <motion.div className="glass-card p-4"
          initial={{y:-100,opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{duration:1,ease:easeInOut}}
            >
            <div className="text-center mb-4">
             <motion.img
                className='logo-img'
                src={logo}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration:2,ease:easeInOut}}
                />
            </div>

            <Form>
              <Form.Group className='mb-3'>
                <FloatingLabel controlId='username' label="Username">
                  <Form.Control type="text" placeholder='username' name="username" />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className='mb-3'>
                <FloatingLabel controlId='password' label="Password">
                  <Form.Control type="password" placeholder='password' name='password' />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className='mb-3 text-center'>
                <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#17c1e8" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="btn btn-info px-5 text-center"
                onClick={handleSubmit}
            >
                Login
            </motion.button>
              </Form.Group>
            </Form>

            <div className="text-center">
              <a href="#" className="text-muted">Forgot password?</a>
            </div>
          </motion.div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

import React, { useState } from "react";
import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        userName,
        password
      });

      // Adjust to res.data.token if your backend returns an object
      const token = res.data.token || res.data; 
      localStorage.setItem("token", token);
      navigate("/books");
    } catch (err) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-page-wrapper d-flex align-items-center">
      <Container>
        <div className="d-flex justify-content-center">
          <Card className="login-card shadow-lg border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <div className="login-icon-circle mb-3">
                  <span className="fs-1">🔐</span>
                </div>
                <h2 className="fw-bold text-dark">Welcome Back</h2>
                <p className="text-muted">Please enter your details to sign in</p>
              </div>

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label className="small fw-bold">USERNAME</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    className="py-2 px-3 bg-light border-0"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label className="small fw-bold">PASSWORD</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    className="py-2 px-3 bg-light border-0"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-2 fw-bold shadow-sm"
                  style={{ borderRadius: '8px', letterSpacing: '1px' }}
                >
                  SIGN IN
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="small text-muted">
                  Don't have an account? <span className="text-primary fw-bold" style={{cursor:'pointer'}}>Contact Admin</span>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default Login;
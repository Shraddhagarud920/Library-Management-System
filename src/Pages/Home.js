import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="bg-dark text-white py-5 mb-5 shadow-lg">
        <Container>
          <Row className="align-items-center py-5">
            <Col md={6}>
              <h1 className="display-3 fw-bold mb-3">Your Personal <br/> <span className="text-primary">Digital Library</span></h1>
              <p className="lead mb-4 text-secondary">
                Organize, track, and manage your book collection with ease. 
                The ultimate tool for book lovers and researchers.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <Button variant="primary" size="lg" className="px-4 me-md-2" onClick={() => navigate('/books')}>
                  View Collection
                </Button>
                <Button variant="outline-light" size="lg" className="px-4" onClick={() => navigate('/login')}>
                  Account Login
                </Button>
              </div>
            </Col>
            <Col md={6} className="text-center d-none d-md-block">
              {/* You can replace this with a real image link later */}
              <div className="p-5 bg-primary rounded-circle shadow-lg d-inline-block">
                 <h2 className="text-white display-1">📚</h2>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="mb-5">
        <Row className="text-center">
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-3">
              <Card.Body>
                <div className="fs-1 mb-3">🔒</div>
                <Card.Title className="fw-bold">Secure Access</Card.Title>
                <Card.Text>Your library is protected by JWT-based security protocols.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-3">
              <Card.Body>
                <div className="fs-1 mb-3">⚡</div>
                <Card.Title className="fw-bold">Fast Management</Card.Title>
                <Card.Text>Add, edit, or remove books from your list instantly.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm p-3">
              <Card.Body>
                <div className="fs-1 mb-3">📱</div>
                <Card.Title className="fw-bold">Fully Responsive</Card.Title>
                <Card.Text>Access your collection from your phone, tablet, or desktop.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
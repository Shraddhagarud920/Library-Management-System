import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col, Spinner } from "react-bootstrap";
import { BookService } from "../Service/api"; // Import the service
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Using our new service instead of axios.post
      await BookService.addBook({ name, author });
      navigate("/books");
    } catch (err) {
      console.error("Error adding book:", err);
      alert("Failed to add book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-book-wrapper py-5" style={{ background: '#f4f7f6', minHeight: '90vh' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="border-0 shadow-lg p-4">
              <Card.Body>
                <div className="text-center mb-4">
                  <div className="display-4 mb-2">📚</div>
                  <h3 className="fw-bold">Add New Book</h3>
                </div>

                <Form onSubmit={handleAdd}>
                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-bold text-uppercase">Book Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter book name..."
                      className="py-2 border-0 bg-light"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-bold text-uppercase">Author Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter author name..."
                      className="py-2 border-0 bg-light"
                      onChange={(e) => setAuthor(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button type="submit" variant="primary" size="lg" disabled={loading}>
                      {loading ? <Spinner size="sm" animation="border" /> : "Save Book"}
                    </Button>
                    <Button variant="link" className="text-muted" onClick={() => navigate("/books")}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddBook;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, InputGroup, Form } from 'react-bootstrap';
import { BookService } from '../Service/api';

import { useNavigate } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const res = await BookService.getAllBooks();
      setBooks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching books", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await BookService.deleteBook(id);
        // Refresh the list after deleting
        loadBooks();
      } catch (err) {
        alert("Failed to delete book");
      }
    }
  };

  const filteredBooks = books.filter(book => 
    (book.name && book.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Loading your library...</p>
      </Container>
    );
  }

  return (
    <div className="booklist-bg py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap">
          <div>
            <h2 className="fw-bold text-dark mb-0">My Collection</h2>
            <p className="text-muted">{books.length} books found</p>
          </div>
          <div style={{ minWidth: '300px' }}>
            <InputGroup className="shadow-sm border rounded">
              <Form.Control
                placeholder="Search by name or author..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 py-2"
              />
            </InputGroup>
          </div>
        </div>

        <Row>
          {filteredBooks.map((book) => (
            <Col key={book.id} xs={12} sm={6} lg={4} xl={3} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <div className="text-center py-4 bg-light">
                   <span style={{ fontSize: '3rem' }}>📖</span>
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold mb-1">{book.name}</Card.Title>
                  <Card.Subtitle className="mb-3 text-muted">by {book.author}</Card.Subtitle>
                  
                  <div className="mt-auto d-flex justify-content-between">
                    <Button variant="outline-primary" size="sm">Edit</Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm" 
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredBooks.length === 0 && (
          <div className="text-center mt-5 py-5">
            <h4 className="text-muted">No books matching your search.</h4>
          </div>
        )}
      </Container>
    </div>
  );
}

export default BookList;

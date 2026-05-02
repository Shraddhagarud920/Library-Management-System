import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function MyNavbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3">
      <Container>
        {/* Brand redirects to home or books */}
        <Navbar.Brand as={Link} to={token ? "/books" : "/"} className="fw-bold fs-4">
          📚 BookManager
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {token ? (
              <>
                <Nav.Link as={Link} to="/books" className="me-3">My Collection</Nav.Link>
                <Nav.Link as={Link} to="/add" className="me-3">Add Book</Nav.Link>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={handleLogout}
                  className="px-3"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => navigate("/login")}
                className="px-4"
              >
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;

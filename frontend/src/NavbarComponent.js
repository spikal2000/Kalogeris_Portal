import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Bakery Logo</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Home</Link>
                    </Nav>
                    <Nav>
                        <Link to="/login" className="btn btn-outline-primary">Σύνδεση</Link>
                    </Nav>
                    
                </Container>
            </Navbar>

        </div>
    );
};

export default NavbarComponent;
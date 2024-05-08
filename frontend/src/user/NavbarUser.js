import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const handleDelete = () => {
    axios.get('http://localhost:8081/logout')
    .then(response => {
        window.location.reload();
    }).catch(error => {
        console.log(error);
    });
};

const NavbarUser = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Bakery Logo</Navbar.Brand>
                    <Nav className="me-auto">
                            <Link to="/" className="nav-link">Home</Link>
                    </Nav>
                    <Nav>
                        <button className="btn btn-outline-danger" style={{ marginLeft: '10px' }} onClick={handleDelete}>Εξοδος</button>
                    </Nav>
                    
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarUser;
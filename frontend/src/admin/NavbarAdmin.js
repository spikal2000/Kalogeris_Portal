import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
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



const NavbarAdmin = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Bakery Logo</Navbar.Brand>
                    <Nav className="me-auto">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/uploadFile" className="nav-link">Upload File</Link>
                    </Nav>
                    <Nav>
                        {/* <Link to="/login" className="btn btn-outline-primary">Login</Link>
                        <Link to="/register" className="btn btn-outline-success" style={{ marginLeft: '10px' }}>Register</Link> */}
                        <Link to="/addUser" className="btn btn-outline-primary">Add User</Link>
                        <button className="btn btn-outline-danger" style={{ marginLeft: '10px' }} onClick={handleDelete}>Εξοδος</button>
                    </Nav>
                    
                </Container>
            </Navbar>

        </div>
    );
};

export default NavbarAdmin;
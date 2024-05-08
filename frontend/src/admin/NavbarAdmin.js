import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';







const NavbarAdmin = () => {

    const navigate = useNavigate();

    const handleDelete = () => {
        axios.get('http://localhost:8081/logout', { withCredentials: true })
        .then(response => {
            localStorage.removeItem('token');
            navigate('/');
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    };

    
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
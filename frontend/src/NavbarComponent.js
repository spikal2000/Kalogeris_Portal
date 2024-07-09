import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';
import logo from './kalogerisLogo(1).png';




const NavbarComponent = () => {
    // create auth for admin user and visitor
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [userRole, setUserRole] = useState('');  
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

   
   
    
    useEffect(() => {
        axios.get('/', { withCredentials: true })
        .then(response => {
            console.log('Response data:', response.data); 
                if(response.data.authenticated){
                    setAuth(true);
                    setUserRole(response.data.role);
                    setMessage(`Welcome ${response.data.username}`);
                    setUsername(response.data.username);
                }else{
                    setAuth (false);
                }
            }
        )
        .catch(error => {
            console.error('Authentication error:', error);
            setAuth(false);
        })
              
    }, [])

    
    const handleDelete = () => {
        axios.get('logout', { withCredentials: true })
        .then(response => {
            localStorage.removeItem('token');
            navigate('/');
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
    };


    
    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="navbar-brand"><img src={logo} alt="Kalogeris" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                        {auth && userRole === 'admin' && (
                            <NavDropdown title="Supervisor" id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/uploadFileSelection">Upload File</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/addUser">Add User</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                    <Nav>
                        {auth && <Navbar.Text className="me-2">Welcome, {username}</Navbar.Text>}
                        {auth && (userRole === 'admin' || userRole === 'user') &&
                            <button className="btn btn-outline-danger me-2" onClick={handleDelete}>Εξοδος</button>
                        }
                        {!auth && <Link to="/login" className="btn btn-outline-primary me-2">Σύνδεση</Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;

// {auth && userRole === 'admin' && <NavbarAdmin />}
// {auth && userRole === 'user' && <NavbarUser />}
// {!auth && <NavbarComponent />}
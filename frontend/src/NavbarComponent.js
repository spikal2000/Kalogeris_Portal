import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
        axios.get('http://localhost:8081/', { withCredentials: true })
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
                    {/* <Navbar.Brand href="/">Bakery Logo</Navbar.Brand> */}
                    <Navbar.Brand href="/" className="navbar-brand"><img src={logo} alt="Kalogeris" /></Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        {auth && (userRole === 'admin') && (
                            <NavDropdown title="Supervisor" id="basic-nav-dropdown">
                                <NavDropdown.Item><Link to="/uploadFile" className="dropdown-item">Upload File</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/addUser" className="dropdown-item">Add User</Link></NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                    <Nav>
                        {
                            auth && <Navbar.Brand className="text font-weight-bold">{username}</Navbar.Brand>
                        }           
                                

                        {
                        auth && (userRole === 'admin' || userRole === 'user') && 
                            <button className="btn btn-outline-danger" style={{ marginLeft: '10px' }} onClick={handleDelete}>Εξοδος</button>
                        }

                        {!auth && <Link to="/login" className="btn btn-outline-primary">Σύνδεση</Link>}
                    </Nav>
                    
                </Container>
            </Navbar>

        </div>
    );
};

export default NavbarComponent;

// {auth && userRole === 'admin' && <NavbarAdmin />}
// {auth && userRole === 'user' && <NavbarUser />}
// {!auth && <NavbarComponent />}
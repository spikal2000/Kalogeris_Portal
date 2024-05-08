import React, { useState, useEffect } from 'react';
import NavbarAdmin from './admin/NavbarAdmin';
import NavbarUser from './user/NavbarUser';
import NavbarComponent from './NavbarComponent';

import axios from 'axios';

function HomePage() {

    // create auth for admin user and visitor
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [userRole, setUserRole] = useState('');

    
    useEffect(() => {
        axios.get('http://localhost:8081/', { withCredentials: true })
        .then(response => {
            console.log('Response data:', response.data); 
                if(response.data.authenticated){
                    setAuth(true);
                    setUserRole(response.data.role);
                    setMessage(`Welcome ${response.data.username}`);
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


return (
    <>
        {auth && userRole === 'admin' && <NavbarAdmin />}
        {auth && userRole === 'user' && <NavbarUser />}
        {!auth && <NavbarComponent />}
        <h1>{message}</h1>
        <div className="text-center mt-5">
            <h1>Bakery Logo</h1>
        </div>
    </>
);

}

export default HomePage;

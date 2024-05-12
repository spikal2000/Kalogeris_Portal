import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from './NavbarComponent';

const Login = () => {

     
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(response => 
            {
                if(response.data.Status === 'User logged in'){
                    console.log(response);
                    navigate('/');
                }else{
                    alert('Υπήρξε κάποιο πρόβλημα');
                }
            })
        .catch(error => 
        {
            if(error.response.status === 401){
                alert('Λάθος κωδικός');
            }else if(error.response.status === 404){
                alert('Χρήστης δεν βρέθηκε');
            }else{
                alert('Υπήρξε κάποιο πρόβλημα');
            }
        });
        

    }

    return (
        <>
            <NavbarComponent />
            
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div className='bg-white p-5 rounded w-25'>
                    <h2>Σύνδεση</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='username' className='form-label'>username</label>
                            <input type='text' onChange={e => setValues({...values, username: e.target.value})} className='form-control rounded-0' name='username' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>Κωδικός</label>
                            <input type='password' onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0' name='password' />
                        </div>
                        <button type='submit' className='btn btn-success w-100 rounded-0'>Σύνδεση</button>
                        <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 mt-2'>Ακυρο</Link>
                    </form>
                </div>  
                
            </div>
        </>
    );
};

export default Login;
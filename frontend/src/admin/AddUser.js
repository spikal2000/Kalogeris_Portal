import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../NavbarComponent';

function AddUser(){
    
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post('/addUser', values)
        .then(response => 
            {
                if(response.data.Status === 'User created'){
                    console.log(response);
                    alert('Ο χρήστης προστέθηκε επιτυχώς');
                    navigate('/');
                }else{
                    // alert('Υπήρξε κάποιο πρόβλημα');
                    alert(response.data.Status)
                }
            })
        .catch(error => {
            console.log(error);
            alert('Υπήρξε κάποιο πρόβλημα');
        });
        

    }

    return (
        <>
        <NavbarComponent />
    <div className="d-flex justify-content-center align-items-center vh-100">
        
        <div className="bg-light p-5 rounded w-30">
            <h2>Προσθήκη Xρήστη</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Όνομα</label>
                    <input type="text" onChange={e => setValues({...values, username: e.target.value})} className="form-control rounded-0" name="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" onChange={e => setValues({...values, email: e.target.value})} className="form-control rounded-0" name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="onChange={e => setValues({...values, email: e.target.value})}" className="form-label">Κωδικός</label>
                    <input type="password" onChange={e => setValues({...values, password: e.target.value})} className="form-control rounded-0" name="password" />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">Καταχώρηση</button>
            </form>
        </div>
    </div>
    </>
    )
}

export default AddUser;
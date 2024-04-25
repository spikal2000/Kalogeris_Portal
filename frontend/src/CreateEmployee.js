import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEmployee() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        console.log(name, surname, email, role);
        axios.post('http://localhost:8081/create', {
            name: name,
            surname: surname,
            email: email,
            role: role
        })
            .then((response) => {
                console.log(response);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded mx-auto'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label for='name' className='form-label'>Name</label>
                        <input type='text' id='name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label for='surname' className='form-label'>Surname</label>
                        <input type='text' id='surname' className='form-control' value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label for='email' className='form-label'>Email</label>
                        <input type='email' id='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label for='role' className='form-label'>Role</label>
                        <input type='text' id='role' className='form-control' value={role} onChange={(e) => setRole(e.target.value)} />
                    </div>
                    <button type='submit' className='btn btn-primary'>Add Employee</button>
                </form>
            </div>
        </div>
    );
}

export default CreateEmployee;
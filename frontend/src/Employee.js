import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Employee() {

    const [employees, setEmployees] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded mx-auto'>
                <Link to="/create" className='btn btn-success'>Add Employee</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                       {employees.map((employee,i ) => (
                            <tr>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.surname}</td>
                                <td>{employee.email}</td>
                                <td>{employee.role}</td>
                                <td>
                                    <Link to={`/update/${employee.id}`} className='btn btn-primary'>Update</Link>
                                    <button className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Employee;

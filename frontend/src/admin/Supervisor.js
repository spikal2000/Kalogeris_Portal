import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../NavbarComponent';
import "./crads.css"

function Supervisor(){
    
    return (
        <>
        <NavbarComponent />

        {/* <br />
        <br />
        <br />
        <br /> */}

        <div class="container mt-100">              
            <div class="row">
                <div class="col-md-4 col-sm-6">
                    <a href="/addUser" data-abc="true">
                        <div class="card mb-30">
                            <div class="inner">
                                {/* <div class="main-img"><img src="https://i.imgur.com/O0GMYuw.jpg" alt="Category"></div>
                                <div class="thumblist"><img src="https://i.imgur.com/ILEU18M.jpg" alt="Category"><img src="https://i.imgur.com/2kePJmX.jpg" alt="Category"></div> */}
                            </div>
                            <div class="card-body text-center">
                                <h4 class="card-title">Προσθήκη</h4>
                                <h4 class="card-title">Χρήστη</h4>
                                <p class="text-muted"></p>
                                {/* <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Products</a> */}
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-md-4 col-sm-6">
                    <a href="/uploadFileSelection" data-abc="true">
                        <div class="card mb-30">
                            <div class="inner">
                                {/* <div class="main-img"><img src="https://i.imgur.com/O0GMYuw.jpg" alt="Category"></div>
                                <div class="thumblist"><img src="https://i.imgur.com/ILEU18M.jpg" alt="Category"><img src="https://i.imgur.com/2kePJmX.jpg" alt="Category"></div> */}
                            </div>
                            <div class="card-body text-center">
                                <h4 class="card-title">Ανέβασμα </h4>
                                <h4 class="card-title">Αρχείου</h4>
                                <p class="text-muted"></p>
                                {/* <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Products</a> */}
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-md-4 col-sm-6">
                    <a href="/powerbi" data-abc="true">
                        <div class="card mb-30">
                            <div class="inner">
                                {/* <div class="main-img"><img src="https://i.imgur.com/O0GMYuw.jpg" alt="Category"></div>
                                <div class="thumblist"><img src="https://i.imgur.com/ILEU18M.jpg" alt="Category"><img src="https://i.imgur.com/2kePJmX.jpg" alt="Category"></div> */}
                            </div>
                            <div class="card-body text-center">
                                <h4 class="card-title">Charts </h4>
                                <h4 class="card-title">Charts </h4>
                                <p class="text-muted"></p>
                                {/* <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Products</a> */}
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-md-4 col-sm-6">
                    <a href="/generalorders" data-abc="true">
                        <div class="card mb-30">
                            <div class="inner">
                            </div>
                            <div class="card-body text-center">
                                <h4 class="card-title">Orders </h4>
                                <h4 class="card-title"> </h4>
                                <p class="text-muted"></p>
                                {/* <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Products</a> */}
                            </div>
                        </div>
                    </a>
                </div>
                
            </div>
        </div>

        
    </>
    )
};

export default Supervisor;

// <NavDropdown title="Supervisor" id="basic-nav-dropdown">
//     <NavDropdown.Item as={Link} to="/uploadFileSelection">Upload File</NavDropdown.Item>
//     <NavDropdown.Item as={Link} to="/addUser">Add User</NavDropdown.Item>
// </NavDropdown>
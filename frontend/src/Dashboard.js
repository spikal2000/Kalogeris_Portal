import React, { useState } from 'react';
import NavbarComponent from './NavbarComponent';
// import "./crads.css"

function Dashboard(){
    
    return (
        <>
        <NavbarComponent />

        {/* <br />
        <br />
        <br />
        <br /> */}

        <div class="container mt-100">              
            <div class="row">

                {/* start  */}
                
                <div class="col-md-4 col-sm-6">
                    <a href="/generalorders" data-abc="true">
                        <div class="card mb-30">
                            <div class="inner">
                            </div>
                            <div class="card-body text-center">
                                <h4 class="card-title"> </h4>
                                <h4 class="card-title">Παραγγελίες</h4>
                                <p class="text-muted"></p>
                                {/* <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Products</a> */}
                            </div>
                        </div>
                    </a>
                </div>

                {/* END */}
                
            </div>
        </div>

        
    </>
    )
};

export default Dashboard;

// <NavDropdown title="Supervisor" id="basic-nav-dropdown">
//     <NavDropdown.Item as={Link} to="/uploadFileSelection">Upload File</NavDropdown.Item>
//     <NavDropdown.Item as={Link} to="/addUser">Add User</NavDropdown.Item>
// </NavDropdown>
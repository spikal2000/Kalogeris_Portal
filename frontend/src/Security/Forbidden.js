import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../NavbarComponent';


function Forbidden(){
    
    return (
        <>
        <NavbarComponent />

            <br />
            <br />
            <br />
            <br />

        <h4>NOPE</h4>
        
    </>
    )
};

export default Forbidden;
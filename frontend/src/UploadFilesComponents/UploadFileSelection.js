import React from 'react';
import NavbarComponent from '../NavbarComponent';
import { useNavigate } from 'react-router-dom';


function UploadFileSelection() {
    
    const history = useNavigate();
    
    const handleClick = (branch, code) => {
       history(`/uploadFile/${branch}/${code}`);
    };
    
    return (
        <>
            <NavbarComponent />
            <div class="container mt-5">
                <div class="d-flex flex-column align-items-center">
                    <div class="w-50 ">
                        <button class="btn btn-light w-50 mb-5" style={{ height: '60px', fontWeight: 'bold'}} onClick={() => handleClick('Ελληνικό', 'elliniko')}>
                            Ελληνικό
                        </button>
                    </div>
                    <div class="w-50">
                        <button class="btn btn-light w-50 mb-5" style={{ height: '60px', fontWeight: 'bold'}} onClick={() => handleClick('Βούλα', 'boula')}>
                            Βούλα
                        </button>
                    </div>
                    <div class="w-50">
                        <button class="btn btn-light w-50" style={{ height: '60px', fontWeight: 'bold'}} onClick={() => handleClick('Παλαιό Φάληρο','pf')}>
                            Παλαιό Φάληρο
                        </button>
                    </div>
                </div>
            </div>
        </>


    );
}

export default UploadFileSelection;
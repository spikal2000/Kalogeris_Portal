import React from 'react';
import NavbarComponent from './NavbarComponent';
import logo from './logo.png';


function HomePage() {

    


return (
    <>
        <NavbarComponent />
        
        <div className="text-center">
            {/* // add image */}
            <img src={logo} alt="logo" />
        </div>
    </>
);

}

export default HomePage;

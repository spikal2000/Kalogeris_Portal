import React from 'react';
import NavbarComponent from '../NavbarComponent';

const PowerBiCharts = () => {
    return (
        <>
            <NavbarComponent />
            <div className="general-orders-container">
                <iframe 
                    title="Power BI Report" 
                    width="1140" 
                    height="850"  // Adjusted the height here
                    src="https://app.powerbi.com/reportEmbed?reportId=45cc3b33-6b36-4b08-814e-68fb18d55bb9&autoAuth=true&ctid=083e698c-26e8-4b8d-aed1-fcdb11680e42" 
                    frameBorder="3" 
                    allowFullScreen={true}
                    style={{ width: '95%', height: '850px' }}
                ></iframe>
            </div>
        </>
    );
}

export default PowerBiCharts;

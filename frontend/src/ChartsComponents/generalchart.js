import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../NavbarComponent';
import lineCharts from './LineChartComponent';
import "../css/generalChart.css"
import BarChartComponent from './BarChartComponent';
import LineChartComponent from './LineChartComponent'




const generalChart = () => {

    const data = [
        { name: 'Page A', value: 4000 },
        { name: 'Page B', value: 3000 },
        { name: 'Page C', value: 2000 },
        { name: 'Page D', value: 2780 },
        { name: 'Page E', value: 1890 },
        { name: 'Page F', value: 2390 },
        { name: 'Page G', value: 3490 },
        { name: 'Page G', value: 3490 },
        { name: 'Page G', value: 3490 },
    ];
    const data2 = [
        { name: 'January', income: 4000, expenses: 2400 },
        { name: 'February', income: 3000, expenses: 1398 },
        { name: 'March', income: 2000, expenses: 9800 },
        { name: 'April', income: 2780, expenses: 3908 },
        { name: 'May', income: 1890, expenses: 4800 },
        { name: 'June', income: 2390, expenses: 3800 },
        { name: 'July', income: 3490, expenses: 4300 },
    ];
    

    return (
        <>
    <NavbarComponent />
    <div className="container mt-10" style={{ marginTop: '100px' }}>
        <div className="row">
            <div className="col">
                <h4 className="text-primary">Elliniko</h4>
                {/* <hr className="bg-primary" /> */}
            </div>
        </div>
    </div>


    {/* Buttons section */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button className="btn btn-primary mx-2">Τελευταίες 30 μέρες</button>
        <button className="btn btn-primary mx-2">Button 2</button>
        <button className="btn btn-primary mx-2">Button 3</button>
    </div>
    

    {/* KPI Cards section */}
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <KpiCard id="Income" title="Έσοδα" value='100' />
        <KpiCard id="Expenses" title="Έξοδα" value='200'/>
        <KpiCard id="normal" title="Έξοδα" value='200'/>
    </div>

    <hr></hr>
    
    {/* Charts section */}
    <div class="container mt-3 start-from-left">
        <div class="row">
            <div class="col-md-6 col-sm-12"> 
                <h3 style={{ fontSize: '16px', textAlign: 'center' }}>BarChartComponent</h3>
                <div class="chart-container" style={{ height: '300px' }}>
                    <BarChartComponent data={data} />
                </div>
            </div>
            <div class="col-md-6 col-sm-12"> 
                <h3 style={{ fontSize: '16px', textAlign: 'center' }}>LineChartComponent</h3>
                <div class="chart-container" style={{ height: '300px' }}>
                    <LineChartComponent data={data2} />
                </div>
            </div>
        </div>
    </div>
</>


    

    );
};
const KpiCard = ({ id, title, value }) => {

    let cardClassName;
    if (id === 'Income') {
        cardClassName = 'income-card';
    } else if (id === 'Expenses') {
        cardClassName = 'expenses-card';
    } else {
        cardClassName = 'default-card'; // or whatever you want the default to be
    }
    
    
    return (
        <div className={`kpi-card ${cardClassName}`}>
            <h3>{title}</h3>
            <h4>{value}</h4>
        </div>
    );
};
export default generalChart;


// <div class="container mt-100">              
// <div class="row">
//     <div class="col-md-4 col-sm-6">
//         <a href="/addUser" data-abc="true">
//             <div class="card mb-30">
//                 <div class="inner">
//                     {/* <div class="main-img"><img src="https://i.imgur.com/O0GMYuw.jpg" alt="Category"></div>
//                     <div class="thumblist"><img src="https://i.imgur.com/ILEU18M.jpg" alt="Category"><img src="https://i.imgur.com/2kePJmX.jpg" alt="Category"></div> */}
//                 </div>
//                 <div class="card-body text-center">
//                     <h4 class="card-title">Προσθήκη Χρήστη</h4>
//                     <h4 class="card-title">Χρήστη</h4>
//                     <p class="text-muted"></p>
//                     {/* <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Products</a> */}
//                 </div>
//             </div>
//         </a>
//     </div>
//     <div class="col-md-4 col-sm-6">
//         <a href="/uploadFileSelection" data-abc="true">
//             <div class="card mb-30">
//                 <div class="inner">
//                     {/* <div class="main-img"><img src="https://i.imgur.com/O0GMYuw.jpg" alt="Category"></div>
//                     <div class="thumblist"><img src="https://i.imgur.com/ILEU18M.jpg" alt="Category"><img src="https://i.imgur.com/2kePJmX.jpg" alt="Category"></div> */}
//                 </div>
//                 <div class="card-body text-center">
//                     <h4 class="card-title">Ανέβασμα </h4>
//                     <h4 class="card-title">Αρχείου</h4>
//                     <p class="text-muted"></p>
//                     {/* <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Products</a> */}
//                 </div>
//             </div>
//         </a>
//     </div>
//     <div class="col-md-4 col-sm-6">
//         <a href="/generalchart" data-abc="true">
//             <div class="card mb-30">
//                 <div class="inner">
//                     {/* <div class="main-img"><img src="https://i.imgur.com/O0GMYuw.jpg" alt="Category"></div>
//                     <div class="thumblist"><img src="https://i.imgur.com/ILEU18M.jpg" alt="Category"><img src="https://i.imgur.com/2kePJmX.jpg" alt="Category"></div> */}
//                 </div>
//                 <div class="card-body text-center">
//                     <h4 class="card-title">Charts </h4>
//                     <h4 class="card-title">Charts </h4>
//                     <p class="text-muted"></p>
//                     {/* <a class="btn btn-outline-primary btn-sm" href="#" data-abc="true">View Products</a> */}
//                 </div>
//             </div>
//         </a>
//     </div>
    
// </div>
// </div>
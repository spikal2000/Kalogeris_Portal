import React, { useState, useEffect } from 'react';
import NavbarComponent from '../NavbarComponent';
import './generalOrders.css'; // Adjust the path if needed
import axios from 'axios';

const GeneralOrders = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        current_branch: '',
        destination_branch: '',
        description: ''
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3001/orders');
            if (Array.isArray(response.data)) {
                setOrders(response.data);
            } else {
                setOrders([]);
            }
        } catch (error) {
            console.error('There was an error fetching the orders!', error);
        }
    };

    

    const handleChange = (e) => {
        setNewOrder({
            ...newOrder,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/orders', newOrder);
            fetchOrders(); // Refresh the list of orders
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <>
            <NavbarComponent />
            <div className="general-orders-container">
                <div className="App">
                    <h1>Add New Order</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="current_branch"
                            placeholder="Current Branch"
                            value={newOrder.current_branch}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="destination_branch"
                            placeholder="Destination Branch"
                            value={newOrder.destination_branch}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={newOrder.description}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Add Order</button>
                    </form>
                    <h1>Orders</h1>
                    <ul>
                        {orders.map(order => (
                            <li key={order.id}>
                                {order.description} - {order.current_branch} to {order.destination_branch}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default GeneralOrders;

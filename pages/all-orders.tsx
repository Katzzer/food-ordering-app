import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OrderData } from "@/data/types";

const AllOrders: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [login, setLogin] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const authStatus = sessionStorage.getItem('isAuthenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
            fetchOrders();
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login === 'admin' && password === 'admin') {
            setIsAuthenticated(true);
            sessionStorage.setItem('isAuthenticated', 'true');
            setError('');
            fetchOrders();
        } else {
            setError('Invalid login or password. Try again.');
        }
    };

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/get-all-orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Failed to fetch orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    if (!isAuthenticated) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <form onSubmit={handleLogin} className="bg-light p-4 rounded shadow">
                    <h2 className="text-center mb-4">Admin Login</h2>
                    <div className="mb-3">
                        <label htmlFor="login" className="form-label">Login</label>
                        <input
                            type="text"
                            id="login"
                            className="form-control"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Enter login"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    {error && <div className="text-danger mb-3">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">All Orders</h1>
            {loading ? (
                <p className="text-center">Loading orders...</p>
            ) : (
                <>
                    {orders.length === 0 ? (
                        <p className="text-center">No orders found.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>Name</th><th>Address</th><th>Phone</th>
                                    <th>Time</th><th>Order Items</th><th>Total Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map((order, index) => {
                                    const totalPrice = order.orderItems.reduce(
                                        (sum, item) => sum + item.price * item.quantity,
                                        0
                                    );
                                    return (
                                        <tr key={index}>
                                            <td>{order.name}</td>
                                            <td>{order.address}</td>
                                            <td>{order.phone}</td>
                                            <td>{formatTime(order.time)}</td>
                                            <td>
                                                <ul>
                                                    {order.orderItems.map((item, idx) => (
                                                        <li key={idx}>
                                                            {item.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>${totalPrice.toFixed(2)}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllOrders;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { clearFoodOrders } from '@/store/globalSlice';
import { FoodOrder } from "@/data/types";
import '@/styles/order-summary.scss';

type Payload = {
    name: string;
    address: string;
    phone: string;
    orders: FoodOrder[];
};

const OrderSummary: React.FC = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    const foodOrders = useSelector(
        (state: { global: { foodOrders: FoodOrder[] } }) => state.global.foodOrders
    );
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const savedName = sessionStorage.getItem('name');
        const savedAddress = sessionStorage.getItem('address');
        const savedPhone = sessionStorage.getItem('phone');

        if (savedName) setName(savedName);
        if (savedAddress) setAddress(savedAddress);
        if (savedPhone) setPhone(savedPhone);
    }, []);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle input changes and save to sessionStorage
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        sessionStorage.setItem('name', value);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAddress(value);
        sessionStorage.setItem('address', value);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhone(value);
        sessionStorage.setItem('phone', value);
    };

    const sendDataToBackend = async (payload: Payload) => {
        try {
            const response = await axios.post('/api/save-order', payload, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log('Order saved successfully!', response.data);
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

    const handleSendData = () => {
        if (!name.trim() || !address.trim() || !phone.trim() || foodOrders.length === 0) {
            alert("Name, address, phone, and orders cannot be empty.");
            return;
        }

        const payload = {
            name,
            address,
            phone,
            orders: foodOrders,
        };

        sendDataToBackend(payload);

        setShowModal(true);

        setTimeout(() => {
            dispatch(clearFoodOrders());
            sessionStorage.removeItem('name');
            sessionStorage.removeItem('address');
            sessionStorage.removeItem('phone');
            router.push('/');
        }, 3000);
    };

    const totalOrderPrice = foodOrders.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
    }, 0);

    const getTotalPriceSpan = () => {
        if (windowWidth > 500) {
            return 3;
        } else if (windowWidth > 400) {
            return 2;
        } else {
            return 1;
        }
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-4">
            <div className="bg-light rounded shadow mb-4" id="order-summary-container">
                <h2 className="text-center mb-4">Order Summary</h2>

                <div className="my-4">
                    <h4>Items in Cart</h4>
                    {foodOrders.length === 0 ? (
                        <p>No items in cart. <Link href="/menu">Order some food</Link>.</p>
                    ) : (
                        <table className="table table-bordered text-center">
                            <thead className="table-dark">
                            <tr>
                                <th id="item-name-th">Name</th>
                                <th id="item-price-per-unit-th">Price Per Unit</th>
                                <th id="item-quantity-th">Quantity</th>
                                <th id="item-price-th">Total Price (Per Item)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {foodOrders.map((item, index) => (
                                <tr key={index}>
                                    <td id="item-name-td">{item.name}</td>
                                    <td id="item-price-per-unit-td">${item.price.toFixed(2)}</td>
                                    <td id="item-quantity-td">{item.quantity || 1}</td>
                                    <td id="item-price-td">${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={getTotalPriceSpan()} className="text-end fw-bold">Total Price:</td>
                                <td className="fw-bold">${totalOrderPrice.toFixed(2)}</td>
                            </tr>
                            </tfoot>
                        </table>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        id="address"
                        className="form-control"
                        value={address}
                        onChange={handleAddressChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        className="form-control"
                        value={phone}
                        onChange={handlePhoneChange}
                    />
                </div>

                <div className="text-center mt-4">
                    <button
                        className="btn btn-success btn-lg"
                        disabled={foodOrders.length === 0}
                        onClick={handleSendData}
                    >
                        Send Order
                    </button>
                </div>
            </div>

            <div className="text-center mt-3">
                <Link href="/menu" className="btn btn-primary btn-lg">
                    Order More Food
                </Link>
            </div>

            {/* Modal Implementation */}
            {showModal && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Order Submitted</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Your order has been successfully submitted!</p>
                                <p>You will be redirected shortly...</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderSummary;
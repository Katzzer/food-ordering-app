import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { clearFoodOrders } from '@/store/globalSlice';
import { FoodOrder } from "@/data/types";

type Payload = {
    name: string;
    address: string;
    phone: string;
    orders: FoodOrder[];
};

const OrderSummary: React.FC = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState(''); // Added phone state
    const [showModal, setShowModal] = useState(false);

    const foodOrders = useSelector(
        (state: { global: { foodOrders: FoodOrder[] } }) => state.global.foodOrders
    );
    const dispatch = useDispatch();
    const router = useRouter();

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
            router.push('/');
        }, 3000);
    };

    const totalOrderPrice = foodOrders.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
    }, 0);

    return (
        <div className="d-flex justify-content-center py-4">
            <div className="w-75 bg-light p-5 rounded shadow">
                <h2 className="text-center mb-4">Order Summary</h2>

                <div className="my-4">
                    <h4>Items in Cart</h4>
                    {foodOrders.length === 0 ? (
                        <p>No items in cart. <Link href="/menu">Order some food</Link>.</p>
                    ) : (
                        <table className="table table-bordered text-center">
                            <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Price Per Unit</th>
                                <th>Quantity</th>
                                <th>Total Price (Per Item)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {foodOrders.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity || 1}</td>
                                    <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={3} className="text-end fw-bold">Total Price:</td>
                                <td className="fw-bold">${totalOrderPrice.toFixed(2)}</td>
                            </tr>
                            </tfoot>
                        </table>
                    )}
                </div>

                {/* Input for Name */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>

                {/* Input for Address */}
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        id="address"
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                    />
                </div>

                {/* Input for Phone */}
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input
                        id="phone"
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="text-center">
                    <button
                        onClick={handleSendData}
                        className="btn btn-success btn-lg mt-4 me-3"
                        disabled={!name.trim() || !address.trim() || !phone.trim() || foodOrders.length === 0}
                    >
                        Send Order
                    </button>
                    <Link href="/menu" className="btn btn-primary btn-lg mt-4">
                        Order More Food
                    </Link>
                </div>
            </div>

            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Thank You!</h5>
                            </div>
                            <div className="modal-body">
                                <p>Your order has been successfully sent. You will be redirected to the home page shortly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderSummary;
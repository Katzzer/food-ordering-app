"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useSelector } from 'react-redux';
import {FoodProps} from "@/data/types";

type Payload = {
    name: string;
    address: string;
    orders: FoodProps[];
};

const Home: React.FC = () => {
    const foodOrders = useSelector(
        (state: { global: { foodOrders: FoodProps[] } }) => state.global.foodOrders
    );

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
        const payload = {
            name: "John Doe", // Dummy name
            address: "123 Main Street, Anytown, Country", // Dummy address
            orders: foodOrders // List of food orders from Redux store
        };

        sendDataToBackend(payload);
    };

    return (
        <div className="d-flex flex-column">
            <main className="text-center">
                <h1 className="display-4 fw-bold text-dark">
                    Welcome to Foodie Heaven!
                </h1>
                <p
                    className="lead text-muted mx-auto"
                    style={{ maxWidth: "600px" }}
                >
                    Experience the joy of ordering fresh, delicious dishes delivered right to your door in minutes!
                </p>

                <Link href="/menu" className="btn btn-primary btn-lg mt-4">
                    Start Ordering
                </Link>

                <button
                    onClick={handleSendData}
                    className="btn btn-success btn-lg mt-4"
                >
                    Send Order Data (testing)
                </button>
            </main>
        </div>
    );
};

export default Home;
"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useSelector } from 'react-redux';
import {FoodProps} from "@/data/types";

const Home: React.FC = () => {
    // Retrieve food orders from the Redux store
    const foodOrders = useSelector(
        (state: { global: { foodOrders: FoodProps[] } }) => state.global.foodOrders
    );

    // Separate the sendDataToBackend function
    const sendDataToBackend = async (foodOrders: FoodProps[]) => {
        try {
            const response = await axios.post('/api/save-order', foodOrders, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log('Order saved successfully!', response.data);
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

    // Function to handle send data button click
    const handleSendData = () => {
        sendDataToBackend(foodOrders);
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
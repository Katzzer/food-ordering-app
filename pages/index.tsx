"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { setMessage } from '@/store/globalSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '@/store/store';

export default function Home() {
    const message = useSelector((state: RootState) => state.global.message);
    const dispatch = useDispatch();

    const changeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        dispatch(setMessage(e.target.value));
    };

    const sendData = async () => {
        const data = {
            name: "Foodie Heaven",
            message: "Welcome to our food ordering app!",
        };

        try {
            const response = await axios.post("https://httpbin.org/post", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200 || response.status === 201) {
                console.log("Data sent successfully!", response.data);
            } else {
                console.error("Failed to send data.", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-between min-vh-100 p-4 pb-5 pt-5">
            <main className="text-center">
                <h1>{message}</h1>
                <input type="text" onChange={changeMessage} value={message}/>
                <h1 className="display-4 fw-bold text-dark">
                    Welcome to Foodie Heaven!
                </h1>
                <p className="lead text-muted mx-auto" style={{maxWidth: "600px"}}>
                    Experience the joy of ordering fresh, delicious dishes delivered right to your door in minutes!
                </p>

                <button className="btn btn-primary btn-lg mt-4">
                    Start Ordering
                </button>

                <Link
                    href="/about"
                    className="btn btn-success btn-lg mt-4"
                >
                    Go to About Page
                </Link>

            </main>

            <footer className="text-center mt-5">
                <div>
                    Created by <a href="https://www.pavelkostal.com"><u>Pavel Kostal</u></a>
                </div>

                <button
                    onClick={sendData}
                    className="btn btn-success btn-lg mt-4"
                >
                    Send Welcome Data
                </button>


            </footer>
        </div>
    );
}
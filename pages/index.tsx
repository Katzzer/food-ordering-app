"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";

export default function Home() {
    const sendData = async () => {
        const data = {
            name: "Foodie Heaven",
            message: "Welcome to our food ordering app!",
        };

        try {
            const response = await axios.post("/api/send-data", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                console.log("Data sent successfully via Next.js API route!", response.data);
            } else {
                console.error("Failed to send data via Next.js API route.", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="d-flex flex-column">
            <main className="text-center">
                <h1 className="display-4 fw-bold text-dark">
                    Welcome to Foodie Heaven!
                </h1>
                <p className="lead text-muted mx-auto" style={{maxWidth: "600px"}}>
                    Experience the joy of ordering fresh, delicious dishes delivered right to your door in minutes!
                </p>

                <Link
                    href="/menu"
                    className="btn btn-primary btn-lg mt-4">
                    Start Ordering
                </Link>

                <button
                    onClick={sendData}
                    className="btn btn-success btn-lg mt-4"
                >
                    Send Welcome Data
                </button>

            </main>

        </div>
    );
}
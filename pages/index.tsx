"use client";
import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
    return (
        <div className="d-flex flex-column"
             style={{
                 color: "#333",
                 padding: "20px",
                 minHeight: "80vh"
             }}>
            <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
                <h1 className="display-4 fw-bold" style={{ fontSize: "3.5rem", color: "#333" }}>
                    Welcome to <span style={{ color: "#0004ff" }}>Foodie Heaven!</span>
                </h1>
                <p
                    className="lead text-dark mx-auto mt-4"
                    style={{ maxWidth: "600px", fontSize: "1.25rem" }}
                >
                    Indulge in the finest dishes, crafted with love and delivered to your doorstep.
                    Your next favorite meal is just a click away!
                </p>

                <div className="mt-4">
                    <Link
                        href="/menu"
                        className="btn btn-primary btn-lg me-3"
                        style={{ padding: "10px 20px", fontSize: "1.2rem" }}
                    >
                        🚀 Explore Menu
                    </Link>

                    <Link
                        href="/about-us"
                        className="btn btn-outline-secondary btn-lg"
                        style={{ padding: "10px 20px", fontSize: "1.2rem" }}
                    >
                        📖 Learn More
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Home;
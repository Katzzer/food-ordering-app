"use client";
import Link from "next/link";
import React from "react";


const Home: React.FC = () => {

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
                    Order your food 😊
                </Link>

            </main>
        </div>
    );
};

export default Home;
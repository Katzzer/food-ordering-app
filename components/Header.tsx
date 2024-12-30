import React from 'react';
import Link from "next/link";

const Header: React.FC = () => {
    const totalItems = 20;

    return (
        <header className="bg-dark text-white py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <Link href="/" className="text-white text-decoration-none fs-4 fw-bold">
                        MyFoodApp
                    </Link>
                </div>

                <div className="d-flex align-items-center">
                    <span className="me-2">Total Items:</span>
                    <span className="badge bg-light text-primary px-3 py-2 fs-6">
                    {totalItems}
                </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
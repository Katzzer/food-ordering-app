import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotalFoodItems, selectTotalPrice } from '@/store/globalSlice';
import Link from "next/link";

const Header = () => {
    const totalItems = useSelector(selectTotalFoodItems);
    const totalPrice = useSelector(selectTotalPrice);

    return (
        <header className="d-flex justify-content-between align-items-center p-3 bg-dark py-3 position-sticky top-0">
            <div className="d-flex align-items-center">
                <Link href="/" className="text-white text-decoration-none fs-4 fw-bold">
                    Food Ordering App
                </Link>
            </div>

            <div className="text-light">
                <span className="fw-bold">Total Items:</span> {totalItems} <br/>
                <span className="fw-bold">Total Price:</span> ${totalPrice.toFixed(2)}
            </div>
        </header>
    );
};

export default Header;
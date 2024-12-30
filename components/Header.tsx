import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotalFoodItems, selectTotalPrice } from '@/store/globalSlice';

const Header = () => {
    const totalItems = useSelector(selectTotalFoodItems); // Total quantity of items
    const totalPrice = useSelector(selectTotalPrice);     // Total price of all items

    return (
        <header className="d-flex justify-content-between align-items-center p-3 bg-dark py-3">
            <h1 className="text-light">Foodie Heaven</h1>
            <div className="text-light">
                <span className="fw-bold">Total Items:</span> {totalItems} <br />
                <span className="fw-bold">Total Price:</span> ${totalPrice.toFixed(2)}
            </div>
        </header>
    );
};

export default Header;
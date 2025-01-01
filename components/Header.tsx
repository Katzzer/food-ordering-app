import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotalFoodItems, selectTotalPrice } from '@/store/globalSlice';
import Link from "next/link";
import { FoodProps } from "@/data/types";

const Header = () => {
    const totalItems = useSelector(selectTotalFoodItems);
    const totalPrice = useSelector(selectTotalPrice);

    const foodOrders = useSelector(
        (state: { global: { foodOrders: FoodProps[] } }) => state.global.foodOrders
    );

    return (
        <header className="d-flex justify-content-between align-items-center p-3 bg-dark py-3 position-sticky top-0 px-5">
            {/* Added px-5 class for more left and right padding */}
            <div className="d-flex align-items-center">
                <Link href="/" className="text-white text-decoration-none fs-4 fw-bold">
                    Food Ordering App
                </Link>
            </div>

            <Link
                href={foodOrders.length > 0 ? "/order-summary" : "#"}
                className={`btn btn-outline-light custom-hover-link ${foodOrders.length === 0 ? "disabled" : ""}`}
                style={{ cursor: foodOrders.length > 0 ? "pointer" : "not-allowed" }}
                onClick={(e) => {
                    if (foodOrders.length === 0) {
                        e.preventDefault();
                        alert("Please add items to your order before proceeding to the summary!");
                    }
                }}
            >
                <div>
                    <span className="fw-bold">Total Items:</span> {totalItems} <br />
                    <span className="fw-bold">Total Price:</span> ${totalPrice.toFixed(2)}
                </div>
            </Link>
        </header>
    );
};

export default Header;
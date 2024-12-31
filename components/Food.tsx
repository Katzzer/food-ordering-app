import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFoodOrder, removeFoodOrder } from '@/store/globalSlice';
import { RootState } from '@/store/store';
import Image from 'next/image';
import {FoodProps} from '@/data/types';

const Food: React.FC<FoodProps> = ({ name, internalName, description, image, price }) => {
    const dispatch = useDispatch();

    const quantity = useSelector((state: RootState) => {
        const orders = state.global?.foodOrders || [];
        return orders.find((order) => order.internalName === internalName)?.quantity || 0;
    });

    const handleIncrease = () => {
        dispatch(addFoodOrder({ internalName, price }));
    };

    const handleDecrease = () => {
        dispatch(removeFoodOrder({ internalName, price }));
    };

    const QuantityControls = () => (
        <div className="d-flex align-items-center justify-content-center mt-3 gap-3">
            <button
                onClick={handleDecrease}
                className={`btn d-flex justify-content-center align-items-center rounded-circle shadow-sm
            ${quantity === 0 ? 'bg-secondary text-light disabled' : 'bg-danger text-white'}`}
                style={{
                    width: '50px',
                    height: '50px',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                }}
                disabled={quantity === 0}
            >
                -
            </button>

            <span className="fs-3 fw-bold">{quantity}</span>

            <button
                onClick={handleIncrease}
                className="btn d-flex justify-content-center align-items-center rounded-circle shadow-sm bg-success text-white"
                style={{
                    width: '50px',
                    height: '50px',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                }}
            >
                +
            </button>
        </div>
    );

    return (
        <div
            className="d-flex flex-column align-items-center justify-content-center p-5 border rounded-2xl shadow-lg bg-white from-gray-50 to-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
            <p
                className="text-gray-600 mt-2 text-sm text-center"
                style={{maxWidth: '400px'}}
            >
                {description}
            </p>
            <Image
                src={image}
                alt={name}
                width={200}
                height={150}
                className="rounded-lg mt-4 shadow-md"
            />
            <p className="text-xl font-semibold text-blue-600 mt-4">${price.toFixed(2)}</p>
            <QuantityControls/>
        </div>
    );
};

export default Food;
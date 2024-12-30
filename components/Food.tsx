import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFoodOrder, removeFoodOrder } from '@/store/globalSlice'; // Adjust the import path
import { RootState } from '@/store/store';
import FoodProps from "@/data/types";
import Image from "next/image"; // Import RootState type

const Food: React.FC<FoodProps> = ({ name, internalName, description, image, price }) => {
    const dispatch = useDispatch();

    const quantity = useSelector((state: RootState) => {
        const orders = state.global?.foodOrders || [];
        return orders.find((order) => order.internalName === internalName)?.quantity || 0;
    });

    const handleIncrease = () => {
        dispatch(addFoodOrder({internalName, price}));
    };

    const handleDecrease = () => {
        dispatch(removeFoodOrder({internalName, price}));
    };

    return (
        <div className="p-4 border rounded-md shadow-md w-80">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-700 mt-2">{description}</p>
            <Image src={image} alt={name} width={200} height={150}/>
            <p className="text-lg font-semibold text-blue-500 mt-2">${price.toFixed(2)}</p>

            <div className="flex items-center mt-4">
                <button
                    onClick={handleDecrease}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded mr-2"
                    disabled={quantity === 0} // Disable "minus" button if quantity is 0
                >
                    -
                </button>

                <span className="text-lg font-semibold">{quantity}</span>

                <button
                    onClick={handleIncrease}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded ml-2"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default Food;
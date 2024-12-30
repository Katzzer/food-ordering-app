import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {FoodOrder} from "@/data/types";

type PayloadProps = {
    internalName: string;
    price: number;
}

interface GlobalState {
    foodOrders: FoodOrder[];
}

const initialState: GlobalState = {
    foodOrders: [],
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        addFoodOrder(state, action: PayloadAction<PayloadProps>) {

            if (!state.foodOrders) {
                state.foodOrders = [];
            }
            const existingOrder = state.foodOrders.find(
                (order) => order.internalName === action.payload.internalName
            );
            if (existingOrder) {
                existingOrder.quantity += 1;
            } else {
                state.foodOrders.push({ internalName: action.payload.internalName, quantity: 1, price: action.payload.price }); // Add new food item
            }
        },

        removeFoodOrder(state, action: PayloadAction<PayloadProps>) {
            if (!state.foodOrders) {
                state.foodOrders = [];
            }
            const existingOrder = state.foodOrders.find(
                (order) => order.internalName === action.payload.internalName
            );
            if (existingOrder && existingOrder.quantity > 1) {
                existingOrder.quantity -= 1; // Decrement quantity if quantity is greater than 1
            } else {
                state.foodOrders = state.foodOrders.filter(
                    (order) => order.internalName !== action.payload.internalName
                );
            }
        },
    },
});

export const { addFoodOrder, removeFoodOrder } = globalSlice.actions;

export default globalSlice.reducer;

export const selectTotalFoodItems = (state: { global: GlobalState }) => {
    return state.global.foodOrders.reduce((total, order) => total + order.quantity, 0);
};

export const selectTotalPrice = (state: { global: GlobalState }) => {
    return state.global.foodOrders.reduce((total, order) => {
        const quantity = order.quantity || 0;
        const price = order.price || 0;
        return total + quantity * price;
    }, 0);
};
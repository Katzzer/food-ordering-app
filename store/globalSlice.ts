import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodOrder } from "@/data/types";

type PayloadProps = {
    internalName: string;
    name: string;
    price: number;
};

interface GlobalState {
    foodOrders: FoodOrder[];
}

// Load initial state from sessionStorage
const initialState: GlobalState = {
    foodOrders: typeof window !== 'undefined' && sessionStorage.getItem('foodOrders')
        ? JSON.parse(sessionStorage.getItem('foodOrders') || '[]') // Parse saved orders
        : [], // Default to an empty array if no data is in sessionStorage
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
                state.foodOrders.push({
                    internalName: action.payload.internalName,
                    name: action.payload.name,
                    quantity: 1,
                    price: action.payload.price,
                });
            }

            // Save to Session Storage only
            sessionStorage.setItem('foodOrders', JSON.stringify(state.foodOrders));
        },

        removeFoodOrder(state, action: PayloadAction<PayloadProps>) {
            if (!state.foodOrders) {
                state.foodOrders = [];
            }

            const existingOrder = state.foodOrders.find(
                (order) => order.internalName === action.payload.internalName
            );

            if (existingOrder && existingOrder.quantity > 1) {
                existingOrder.quantity -= 1;
            } else {
                state.foodOrders = state.foodOrders.filter(
                    (order) => order.internalName !== action.payload.internalName
                );
            }

            sessionStorage.setItem('foodOrders', JSON.stringify(state.foodOrders));
        },

        clearFoodOrders(state) {
            state.foodOrders = [];

            // Clear from Session Storage only
            sessionStorage.removeItem('foodOrders');
        },
    },
});

export const { addFoodOrder, removeFoodOrder, clearFoodOrders } = globalSlice.actions;

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
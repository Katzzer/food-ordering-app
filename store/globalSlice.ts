import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FoodOrder {
    foodName: string;
    quantity: number;
    price: number;
}

interface PayloadProps {
    foodName: string;
    price: number;
}

interface GlobalState {
    foodOrders: FoodOrder[]; // Store a list of ordered food items
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
                (order) => order.foodName === action.payload.foodName
            );
            if (existingOrder) {
                existingOrder.quantity += 1;
            } else {
                state.foodOrders.push({ foodName: action.payload.foodName, quantity: 1, price: action.payload.price }); // Add new food item
            }
        },

        removeFoodOrder(state, action: PayloadAction<PayloadProps>) {
            if (!state.foodOrders) {
                state.foodOrders = [];
            }
            const existingOrder = state.foodOrders.find(
                (order) => order.foodName === action.payload.foodName
            );
            if (existingOrder && existingOrder.quantity > 1) {
                existingOrder.quantity -= 1; // Decrement quantity if quantity is greater than 1
            } else {
                state.foodOrders = state.foodOrders.filter(
                    (order) => order.foodName !== action.payload.foodName
                );
            }
        },
    },
});

export const { addFoodOrder, removeFoodOrder } = globalSlice.actions;

export default globalSlice.reducer;

export const selectTotalFoodItems = (state: { global: GlobalState }) => {
    debugger
    return state.global.foodOrders.reduce((total, order) => total + order.quantity, 0);
};

export const selectTotalPrice = (state: { global: GlobalState }) => {
    return state.global.foodOrders.reduce((total, order) => {
        const quantity = order.quantity || 0;
        const price = order.price || 0;
        return total + quantity * price;
    }, 0);
};
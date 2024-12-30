import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Defining the initial state for Redux
interface FoodOrder {
    foodName: string;
    quantity: number;
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
        // Add Food Order Reducer
        addFoodOrder(state, action: PayloadAction<string>) {
            // Ensure foodOrders is initialized
            if (!state.foodOrders) {
                state.foodOrders = []; // Safeguard against undefined foodOrders
            }
            const existingOrder = state.foodOrders.find(
                (order) => order.foodName === action.payload
            );
            if (existingOrder) {
                existingOrder.quantity += 1; // Increment quantity if item exists
            } else {
                state.foodOrders.push({ foodName: action.payload, quantity: 1 }); // Add new food item
            }
        },

        // Remove Food Order Reducer
        removeFoodOrder(state, action: PayloadAction<string>) {
            // Ensure foodOrders is initialized
            if (!state.foodOrders) {
                state.foodOrders = []; // Safeguard against undefined foodOrders
            }
            const existingOrder = state.foodOrders.find(
                (order) => order.foodName === action.payload
            );
            if (existingOrder && existingOrder.quantity > 1) {
                existingOrder.quantity -= 1; // Decrement quantity if quantity is greater than 1
            } else {
                state.foodOrders = state.foodOrders.filter(
                    (order) => order.foodName !== action.payload
                ); // Remove the item if quantity becomes 0
            }
        },
    },
});

export const { addFoodOrder, removeFoodOrder } = globalSlice.actions;

export default globalSlice.reducer;
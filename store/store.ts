import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

// Example Reducer (you can replace this with your own reducer)
import globalReducer from './globalSlice';

// Combine multiple reducers (optional)
const rootReducer = combineReducers({
    global: globalReducer,
});

// Redux Persist configuration
const persistConfig = {
    key: 'root', // Key for storage
    storage,     // Storage type (localStorage)
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Correct
});

// Set up Redux Persist
export const persistor = persistStore(store);

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
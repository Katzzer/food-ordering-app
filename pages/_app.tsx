import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { store, persistor } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <div className="app-wrapper">
                    <Header />

                    <main className="app-content">
                        <Component {...pageProps} />
                    </main>

                    <Footer />
                </div>
            </PersistGate>
        </Provider>
    );
}
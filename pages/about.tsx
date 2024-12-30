import React from 'react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';

const About: React.FC = () => {
    const { globalMessage, setGlobalMessage } = useAppContext();

    const changeMessage = () => {
        setGlobalMessage('This is the About Page!');
    };

    return (
        <div className="p-4 font-sans">
            <h1 className="display-5 text-dark fw-bold">About Us</h1>
            <h1>{globalMessage}</h1>

            <button className="btn btn-primary" onClick={changeMessage}>
                Change Message
            </button>

            <p className="fs-5 text-secondary mt-3">
                Welcome to our Food Ordering App! We aim to provide the best food delivery service to satisfy your cravings.
            </p>
            <section className="mt-4">
                <h2 className="h4 text-secondary fw-semibold">Our Mission</h2>
                <p className="fs-6 text-muted mt-2">
                    Our mission is to connect people with their favorite food, delivered quickly and conveniently to their doorstep.
                </p>
            </section>
            <section className="mt-4">
                <h2 className="h4 text-secondary fw-semibold">Contact Us</h2>
                <p className="fs-6 text-muted mt-2">
                    Have questions or feedback? Feel free to reach out to us at{' '}
                    <a href="mailto:support@foodapp.com" className="text-primary text-decoration-underline">
                        support@foodapp.com
                    </a>.
                </p>
            </section>
            <Link
                href="/"
                className="btn btn-success btn-lg mt-4"
            >
                Go to Home Page
            </Link>
        </div>
    );
};

export default About;
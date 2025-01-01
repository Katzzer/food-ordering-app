import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center text-center"
            style={{
                color: "#333",
                padding: "20px",
                minHeight: "80vh"
            }}
        >
            <h1 className="display-4 fw-bold mb-4">
                About Us
            </h1>

            <p className="fs-4 mb-4" style={{ maxWidth: "800px" }}>
                Welcome to our food paradise! We are passionate about bringing the best flavors to your table.
                Our team strives to deliver happiness, one meal at a time, right to your doorstep!
            </p>

            <section className="mt-4" style={{ maxWidth: "600px" }}>
                <h2 className="h4 fw-bold">Our Story</h2>
                <p className="fs-5 mt-2">
                    It all began with a simple idea: to make delicious food accessible to everyone. Whether you’re craving
                    pizza at midnight or a fresh breakfast to kickstart your day, we’ve got you covered.
                </p>
            </section>

            <section className="mt-4" style={{ maxWidth: "600px" }}>
                <h2 className="h4 fw-bold">Why Choose Us?</h2>
                <ul className="mt-3 text-start">
                    <li>🌟 Freshly prepared meals, every time.</li>
                    <li>🚀 Superfast delivery to satisfy your cravings.</li>
                    <li>💰 Affordable pricing without compromising quality.</li>
                    <li>💕 We care about our customers and their satisfaction.</li>
                </ul>
            </section>

        </div>
    );
};

export default AboutUs;
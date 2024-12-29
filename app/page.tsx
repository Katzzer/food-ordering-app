"use client"; // Enable Client Component behavior

import Image from "next/image";
import axios from "axios";

export default function Home() {
    const sendData = async () => {
        const data = {
            name: "Foodie Heaven",
            message: "Welcome to our food ordering app!",
        };

        try {
            const response = await axios.post("https://httpbin.org/post", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200 || response.status === 201) {
                console.log("Data sent successfully!", response.data);
            } else {
                console.error("Failed to send data.", response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center text-center">
                {/* Welcome Message */}
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
                    Welcome to Foodie Heaven!
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-xl">
                    Experience the joy of ordering fresh, delicious dishes delivered right to your door in minutes!
                </p>

                <button className="mt-6 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg shadow-md">
                    Start Ordering
                </button>

                <Image
                    src="/images/food-hero.png"
                    alt="Delicious food"
                    width={500}
                    height={300}
                    className="rounded-lg shadow-lg"
                />
            </main>

            <footer className="row-start-3 flex flex-col items-center justify-center gap-4">
                <div>
                    Created by <a href="https://www.pavelkostal.com"><u>Pavel Kostal</u></a>
                </div>

                <button
                    onClick={sendData}
                    className="mt-4 px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-lg shadow-md"
                >
                    Send Welcome Data
                </button>
            </footer>
        </div>
    );
}
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body;

        try {
            const response = await axios.post("https://httpbin.org/post", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            res.status(200).json({ message: "Data sent successfully!", response: response.data });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.message);
                res.status(500).json({
                    error: "Failed to send data",
                    details: error.response?.data || "No additional details", // Safe access to response
                });
            } else {
                // Handle non-Axios errors
                console.error("Unexpected error:", error);
                res.status(500).json({
                    error: "Failed to send data",
                    details: "An unexpected error occurred",
                });
            }
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY;
const API_ENDPOINT = process.env.AZURE_API_ENDPOINT;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await handleGetRequest(req, res);
    } else {
        handleInvalidMethod(req, res);
    }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("Fetching all orders from the API...");

        const url = API_ENDPOINT + "/GetAllOrdersFunction"

        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
            },
        });

        console.log("Orders retrieved successfully:", response.data);

        res.status(200).json(response.data);
    } catch (error) {
        handleError(res, error);
    }
}

function handleInvalidMethod(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

function handleError(res: NextApiResponse, error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        res.status(500).json({
            error: 'Failed to fetch data',
            details: error.response?.data || 'No additional details',
        });
    } else {
        console.error('Unexpected error:', error);
        res.status(500).json({
            error: 'Failed to fetch data',
            details: 'An unexpected error occurred',
        });
    }
}
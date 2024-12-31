import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Foods } from "@/data/foods";
import { FoodOrder } from "@/data/types";

const SUBSCRIPTION_KEY = process.env.AZURE_SUBSCRIPTION_KEY || '4793763d0552436db7b68f495039d637'; // TODO: Replace with actual environment variable.
const API_ENDPOINT = process.env.AZURE_API_ENDPOINT || 'https://food-ordering-app.azure-api.net/save-order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await handlePostRequest(req, res);
    } else {
        handleInvalidMethod(req, res);
    }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body;
    logRequestDetails(data);

    const updatedOrders = updateOrderPrices(data, Foods);

    try {
        const response = await sendOrderToAPI(updatedOrders);
        res.status(200).json({ message: "Data sent successfully!", response: response.data });
    } catch (error) {
        handleError(res, error); // Handle any errors
    }
}

function logRequestDetails(data: FoodOrder[]) {
    console.log("Data received:", data);
    console.log("Menu items:", Foods);
}

function updateOrderPrices(orders: { internalName: string; quantity: number; price?: number }[], menu: typeof Foods): FoodOrder[] {
    return orders.map(order => {
        const menuItem = menu.find(item => item.internalName === order.internalName); // Match menu item by internalName
        if (menuItem) {
            return {
                ...order,
                price: menuItem.price,
                name: menuItem.name,
                description: menuItem.description
            } as FoodOrder;
        }
        return order as FoodOrder;
    });
}

async function sendOrderToAPI(updatedOrders: FoodOrder[]) {
    return axios.post(
        API_ENDPOINT,
        updatedOrders,
        {
            headers: {
                "Content-Type": "application/json",
                'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY,
            },
        }
    );
}

function handleInvalidMethod(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

function handleError(res: NextApiResponse, error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        res.status(500).json({
            error: "Failed to send data",
            details: error.response?.data || "No additional details",
        });
    } else {
        console.error("Unexpected error:", error);
        res.status(500).json({
            error: "Failed to send data",
            details: "An unexpected error occurred",
        });
    }
}
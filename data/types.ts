export type FoodProps = {
    name: string;
    internalName: string;
    description: string;
    image: string;
    price: number;
}

export type FoodOrder = {
    internalName: string;
    name: string;
    quantity: number;
    price: number;
}

export type OrderData = {
    name: string;
    address: string;
    phone: string;
    partitionKey: string;
    time: string;
    orderItems: FoodOrder[];
};

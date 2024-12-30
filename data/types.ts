export type FoodProps = {
    name: string;
    internalName: string;
    description: string;
    image: string;
    price: number;
}

export type FoodOrder = {
    internalName: string;
    quantity: number;
    price: number;
}

import FoodProps from "@/data/types";

export const BIG_MAC: FoodProps = {
    name: "Big Mac",
    internalName: "big_mac",
    description: "Two all beef patties, special sauce, lettuce, cheese.",
    image: "/images/food/big_mac.webp",
    price: 5.99,
};

export const CHICKEN_BURGER: FoodProps = {
    name: "Chicken burger",
    internalName: "chicken_burger",
    description: "Two all beef patties, special sauce, lettuce, cheese.",
    image: "/images/food/chicken_burger.webp",
    price: 5.99,
};

export const Foods = [BIG_MAC, CHICKEN_BURGER];
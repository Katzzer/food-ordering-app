import FoodProps from "@/data/types";

export const BIG_MAC: FoodProps = {
    name: "Big Mac",
    internalName: "big_mac",
    description: "The McDonald's Big Mac is a 100% beef burger with a taste like no other. The mouthwatering perfection starts with two 100% pure all beef patties and Big Mac Sauce sandwiched between a sesame seed bun.",
    image: "/images/food/big_mac.webp",
    price: 5.99,
};

export const CHEESEBURGER: FoodProps = {
    name: "Cheeseburger",
    internalName: "cheeseburger",
    description: "The McDonald’s Cheeseburger is topped with a tangy pickle, chopped onions, ketchup, mustard, and a slice of melty American cheese.",
    image: "/images/food/cheeseburger.avif",
    price: 2.99,
};

export const DOUBLE_CHEESEBURGER: FoodProps = {
    name: "Double Cheeseburger",
    internalName: "double_cheeseburger",
    description: "The McDonald's Double Cheeseburger features two 100% pure all beef patties seasoned with just a pinch of salt and pepper.",
    image: "/images/food/double_cheeseburger.avif",
    price: 3.99,
};

export const FRIES_MEDIUM: FoodProps = {
    name: "Fries Medium",
    internalName: "fries_medium",
    description: "McDonald's World Famous Fries® are made with premium potatoes such as the Russet Burbank and the Shepody.",
    image: "/images/food/fries_medium.jpg",
    price: 1.99,
};

export const Foods = [BIG_MAC, CHEESEBURGER, DOUBLE_CHEESEBURGER, FRIES_MEDIUM];
import React from 'react';
import Food from "@/components/Food";
import { Foods } from "@/data/foods";

const menu: React.FC = () => {
  return (
    <div>
        {Foods.map((food, index) => (

            <Food key={index} name={food.name} internalName={food.internalName} description={food.description} price={food.price} image={food.image} />
        ))}
    </div>
  );
};

export default menu;
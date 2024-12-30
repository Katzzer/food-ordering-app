import React from 'react';
import Food from "@/components/Food";
import { Foods } from "@/data/foods";

const Menu: React.FC = () => {
  return (
      <div className="d-flex flex-wrap justify-content-center gap-4 p-4">
        {Foods.map((food, index) => (
            <Food
                key={index}
                name={food.name}
                internalName={food.internalName}
                description={food.description}
                price={food.price}
                image={food.image}
            />
        ))}
      </div>
  );
};

export default Menu;
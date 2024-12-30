import React from 'react';
import Food from "@/components/Food";

const menu: React.FC = () => {
  return (
    <div>
      <Food foodName={"Big Mac"} description={"Super burger"} price={100}/>
      <Food foodName={"Cheese Burger"} description={"Cheese Burger"} price={100}/>
      <Food foodName={"Cola"} description={"Coca cola"} price={60}/>
      <Food foodName={"Fries"} description={"Fries"} price={60}/>
      <Food foodName={"Cake"} description={"Cake"} price={60}/>
      <Food foodName={"Cafe"} description={"Cafe"} price={60}/>
    </div>
  );
};

export default menu;
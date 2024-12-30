import React from 'react';
import Food from "@/components/Food";

const menu: React.FC = () => {
  return (
    <div>
      <Food foodName={"Burger"} description={"Super burger"} price={100}/>
      <Food foodName={"Cola"} description={"Coca cola"} price={60}/>
    </div>
  );
};

export default menu;
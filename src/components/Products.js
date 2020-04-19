import React, { useContext } from "react";
import { UserContext } from "./Context";
import Product from "./Product";
import { useParams } from "react-router-dom";

export default function Products() {
  const { state } = useContext(UserContext);
  const params = useParams();
  
  const displayItems = () => {
    if (JSON.stringify(params) === "{}") {
      return state.items;
    } else if (params.type === "Low to High") {
      const items = [...state.items];
      return items.sort((a, b) => a.price - b.price);
    } else if (params.type === "High to Low") {
      const items = [...state.items];
      return items.sort((a, b) => b.price - a.price);
    } else {
      return state.items.filter(item => item.type === params.type);
    }
  };

  return (
    <div className="container py-5">
      <div className="products-grid">
        {params &&
          displayItems().map(item => <Product key={item.name} item={item} />)}
      </div>
    </div>
  );
}

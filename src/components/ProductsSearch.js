import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./Context";
import Product from "./Product";

export default function ProductsSearch() {
  const { state } = useContext(UserContext);

  const params = useParams();

  const displayItems = () => {
    let searchedItems = [];
    if (params.term.length < 1) {
      return state.items;
    } else {
      for (let i = 0; i < state.items.length; i++) {
        if (
          state.items[i].name.toLowerCase().includes(params.term.toLowerCase())
        ) {
          searchedItems.push(state.items[i]);
        }
      }
      return searchedItems;
    }
  };


  return (
    <div className="container py-5">
      {displayItems().length > 1 ? (
        <div className="products-grid">
          {displayItems().map(item => (
            <Product key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <h1 className="font-weight-light text-center">
          There are no results with the search term "{params.term}"
        </h1>
      )}
    </div>
  );
}

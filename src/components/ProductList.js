import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_product: products, grid_view: grid } = useFilterContext();

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        sorry, no item matched your search
      </h5>
    );
  }
  if (grid === false) {
    return <ListView products={products} />;
  }
  return <GridView products={products} />;
};

export default ProductList;

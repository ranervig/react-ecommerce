import React from "react";
import ProductItem from "./ProductItem";
import style from "../styles/list.module.css";

const ProductList = ({ products }) => {
  return (
    <main>
      <div className={style.products}>
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ProductList;

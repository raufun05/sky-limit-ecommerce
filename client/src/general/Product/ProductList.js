import React from "react";

function ProductList(props) {
  const products = props.products;

  const listItems = products.map((product) => 
    <a href={"/product/" + product._id}><div >  {product.name}, ${product.price}</div></a>
  );

  return (
    <ul>{listItems}</ul>
  );
}

export default ProductList;
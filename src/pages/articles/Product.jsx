import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import "./Product.style.css";
import { products } from "../../products.js";
import { useCart } from "react-use-cart";

const Product = () => {
  const { addItem } = useCart();
  const [product, setProduct] = useState();
  const { id } = useParams();

  useEffect(() => {
    for (const product of products) {
      if (product.id.toString() === id) {
        setProduct(product);
      }
    }
  }, []);

  return (
    <Container>
      <article className="product-page-product">
        {product && (
          <>
            <h1 className="product-name">{product.name}</h1>
            <figure>
              <img src={product.imgUrl} alt="news" className="product-page-image" />
            </figure>
            <p className="product-page-description">{product.description}</p>
            <p className="product-page-price">${product.price}</p>
            <button
                onClick={() => {addItem(product); window.alert(`${product.name} has been added to the cart.`);}}
                className="product-page-catalog__item-button mb-2"
              >
                Add to Cart
              </button>
          </>
        )}
      </article>
    </Container>
  );
};

export default Product;

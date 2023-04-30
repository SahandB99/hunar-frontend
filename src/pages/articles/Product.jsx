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
      <article className="product">
        {product && (
          <>
            <h1 className="product-title">{product.title}</h1>
            <figure>
              <img src={product.imgUrl} alt="news" className="product-image" />
            </figure>
            <p className="product-description">{product.desc}</p>
            <p className="product-price">{product.price}</p>
            <button
                onClick={() => addItem(product)}
                className="product-catalog__item-button"
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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import "./Product.style.css";
import { data } from "../../data";
import { useCart } from "react-use-cart";

const Product = () => {
  const { addItem } = useCart();
  const [article, setArticle] = useState();
  const { id } = useParams();

  useEffect(() => {
    for (const d of data) {
      if (d.id.toString() === id) {
        setArticle(d);
      }
    }
  }, []);

  return (
    <Container>
      <article className="product">
        {article && (
          <>
            <h1 className="product-title">{article.title}</h1>
            <figure>
              <img src={article.imgUrl} alt="news" className="product-image" />
            </figure>
            <p className="product-description">{article.desc}</p>
            <p className="product-price">{article.price}</p>
            <button
                onClick={() => addItem(article)}
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

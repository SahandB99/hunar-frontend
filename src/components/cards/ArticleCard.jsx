import React from "react";
import { Link } from "react-router-dom";

import "./ArticleCard.styles.css";

const ArticleCard = ({ id, name, description, price, imgUrl }) => {
  return (
    <article className="card">
      <figure>
        <img src={imgUrl} alt="Card Image" className="article-img" />
      </figure>
      <h1 className="article-name">{name}</h1>
      <p className="article-description">{description}</p>
      <div>
        <p className="article-price">Price: ${price}</p>
        <Link to={`/productCatalog/${id}`}>
          <div className="read-more">Read more</div>
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;

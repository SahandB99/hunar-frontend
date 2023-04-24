import React from "react";
import { Link } from "react-router-dom";

import "./ArticleCard.styles.css";

const ArticleCard = ({ id, title, desc, imgUrl }) => {
  return (
    <article className="card">
      <figure>
        <img src={imgUrl} alt="Card Image" />
      </figure>
      <div className="content">
        <h1>{title}</h1>
        <p className="description">{desc}</p>
      </div>
      <Link to={`/productCatalog/${id}`}>
        <div className="read-more">Read more</div>
      </Link>
    </article>
  );
};

export default ArticleCard;

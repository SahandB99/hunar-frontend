import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/container/Container";
import "./Article.style.css";
import { data } from "../../data";

const Article = () => {
  const [article, setArticle] = useState();
  const { id } = useParams();

  // {id:1 , username:"hama"}

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
          </>
        )}
      </article>
    </Container>
  );
};

export default Article;

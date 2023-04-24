import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import "./Products.css";
import { products } from "../../products";

import ArticleCard from "../../components/cards/ArticleCard";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";

const Products = () => {
  const [searchValue, setSearch] = useSearchParams({ searchValue: "" });
  const text = searchValue.get("searchValue");


  const [filteredProducts, setFilteredProducts] = useState();

  const cachedProduct = useMemo(() => {
    return (
      filteredProducts && filteredProducts.map((fd) => ({ ...fd, date: Date.now() }))
    );
  }, [filteredProducts]);

  const handleFilter = (category) => {
    const dataFiltered = products.filter((article) => {
      return article.category.toLocaleLowerCase() === category;
    });
    setFilteredProducts(dataFiltered);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  const handleAllData = () => {
    setFilteredProducts(products);
  };

  return (
    <Container>
      <Button text="All" handleClick={handleAllData} />
      <Button text="News" handleClick={() => handleFilter("news")} />
      <Button text="Blogs" handleClick={() => handleFilter("blog")} />
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setSearch({ searchValue: e.target.value })}
      />
      <section className="articles">
        {filteredProducts &&
          cachedProduct.map((article) => {
            return <ArticleCard {...article} key={article.id} />;
          })}
      </section>
    </Container>
  );
};

export default Products;

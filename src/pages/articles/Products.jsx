import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import "./Articles.css";
import { data } from "../../data";

import ArticleCard from "../../components/cards/ArticleCard";
import Button from "../../components/button/Button";
import Container from "../../components/container/Container";

const Products = () => {
  const [searchValue, setSearch] = useSearchParams({ searchValue: "" });
  const text = searchValue.get("searchValue");
  const location = useLocation();

  const [filteredData, setFilteredData] = useState();

  // const [fetchData, setFetchData] = useState([]);

  const cachedData = useMemo(() => {
    return (
      filteredData && filteredData.map((fd) => ({ ...fd, date: Date.now() }))
    );
  }, [filteredData]);

  const handleFilter = (category) => {
    const dataFiltered = data.filter((article) => {
      return article.category.toLocaleLowerCase() === category;
    });
    setFilteredData(dataFiltered);
  };

  useEffect(() => {
    setFilteredData(data);
  }, []);

  const handleAllData = () => {
    setFilteredData(data);
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
        {filteredData &&
          cachedData.map((article) => {
            return <ArticleCard {...article} key={article.id} />;
          })}
      </section>
    </Container>
  );
};

export default Products;

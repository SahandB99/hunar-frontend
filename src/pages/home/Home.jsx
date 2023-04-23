import React, { useState, useEffect, useMemo } from "react";
import Container from "../../components/container/Container";
import ArticleCard from "../../components/cards/ArticleCard";
import { data } from "../../data";
import "./Home.css";

const Home = () => {
  const [filteredData, setFilteredData] = useState();
  const cachedData = useMemo(() => {
    return (
      filteredData && filteredData.map((fd) => ({ ...fd, date: Date.now() }))
    );
  }, [filteredData]);

  useEffect(() => {
    setFilteredData(data.slice(0, 4));
  }, []);

  return (
    <Container>
      <section className="hunar-section">
        <h1 className="hunar-title">Hunar</h1>
        <p className="hunar-desc">
          Your best website for buying and selling Arts, Antiques, Vintage and
          Sculptures
        </p>
      </section>

      <p className="arts-section">Arts</p>
      <section className="articles">
        {filteredData &&
          cachedData.map((Product) => {
            return <ArticleCard {...Product} key={Product.id} />;
          })}
      </section>

      <p className="featured-section">Featured Items</p>
      <section className="articles">
        {filteredData &&
          cachedData.map((Product) => {
            return <ArticleCard {...Product} key={Product.id} />;
          })}
      </section>
    </Container>
  );
};

export default Home;

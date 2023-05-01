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
        <p className="hunar-desc">Discover a world of beauty and creativity with our diverse collection of paintings, sculptures, and more. Whether you're an art enthusiast, collector, or simply looking to add a touch of elegance to your space, we have something for everyone.
    
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

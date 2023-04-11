import React, { useState } from "react";
import "./ProductCatalog.css";
import Container from "../../components/container/Container";
import { products } from "../../products";

const ProductCatalog = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <Container>
      <div className="product-catalog">
        <h1 className="product-catalog__title">Product Catalog</h1>
        <div className="product-catalog__filter">
          <label htmlFor="category" className="product-catalog__filter-label">
            Filter by Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="product-catalog__filter-dropdown"
          >
            <option value="All">All</option>
            <option value="Art">Art</option>
            <option value="Sculptor">Sculptor</option>
            <option value="Post-impressionist">Post-impressionist</option>
            <option value="Western-art">Western-art</option>
          </select>
        </div>
        <div className="product-catalog__list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-catalog__item">
              <img
                src={product.imgUrl}
                alt={product.name}
                className="product-catalog__item-image"
              />
              <h2 className="product-catalog__item-title">{product.name}</h2>
              <p className="product-catalog__item-description">
                {product.description}
              </p>
              <p className="product-catalog__item-price">${product.price}</p>
              <button
                onClick={() => onAddToCart(product)}
                className="product-catalog__item-button"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductCatalog;

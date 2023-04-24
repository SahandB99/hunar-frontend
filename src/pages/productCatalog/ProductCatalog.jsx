import React, { useState } from "react";
import "./ProductCatalog.css";
import Container from "../../components/container/Container";
import { products } from "../../products";
import { useCart } from "react-use-cart";

const ProductCatalog = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const searchedProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="product-catalog__search">
          <label htmlFor="search" className="product-catalog__search-label">
            Search Products:
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="product-catalog__search-input"
          />
        </div>
        <div className="product-catalog__list">
          {searchedProducts.map((product) => (
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
                onClick={() => addItem(product)}
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
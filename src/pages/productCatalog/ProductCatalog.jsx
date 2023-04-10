import React, { useState } from "react";
import "./ProductCatalog.css";
import Container from "../../components/container/Container";
import { products } from "../../products";

// const products = [
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description of Product 1",
//     category: "Category 1",
//     price: 10,
//     image:
//       "https://cdn0.rubylane.com/_podl/item/454213/TA14125/Antique-19th-Century-Roses-Painting-Gilt-pic-1A-720%3a10.10-b054c828-f.webp",
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     description: "Description of Product 2",
//     category: "Category 2",
//     price: 20,
//     image:
//       "https://cdn0.rubylane.com/_podl/item/2157924/Dianesauvage/Antique-French-statue-bronze-x7822Diane-de-pic-1A-720%3a10.10-d0debba7-f.webp",
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     description: "Description of Product 3",
//     category: "Category 1",
//     price: 30,
//     image:
//       "https://cdn0.rubylane.com/_podl/item/2105998/37/Vintage-WPA-Era-American-Regional-City-pic-1A-720%3a10.10-7dc18b4d-f.webp",
//   },
// ];

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

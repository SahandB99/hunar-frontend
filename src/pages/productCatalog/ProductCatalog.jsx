import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useGetArtsQuery } from "../../api/arts";
import "./ProductCatalog.css";
import Container from "../../components/container/Container";
import { products } from "../../products";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";

const ProductCatalog = () => {
  const { data, isLoading } = useGetArtsQuery();

  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const [searchFocused, setSearchFocused] = useState(false);

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
            className="product-catalog__filter-dropdown border border-gray-500 rounded-lg"
          >
            <option value="All">All</option>
            <option value="Art">Art</option>
            <option value="Sculptor">Sculptor</option>
            <option value="Painting">Painting</option>
            <option value="Western">Western-art</option>
          </select>
        </div>
        <div className="product-catalog__search flex items-center">
          <label htmlFor="search" className="product-catalog__search-label">
            Search Products:
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`product-catalog__search-input border border-gray-500 rounded-lg ml-2 ${
              searchFocused ? "focused" : ""
            }`}
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
              <div className="flex">
                <button
                  onClick={() => {
                    addItem(product);
                    window.alert(`${product.name} has been added to the cart.`);
                  }}
                  className="product-catalog__item-button"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/productCatalog/${product.id}`}
                  className="product-catalog__item-button ml-2"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        data.data.map((art) => (
          <tr>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              {art.name}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {art.description}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">
              {art.price}
            </td>
          </tr>
        ))
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => {
          console.log(e.selected);
        }}
        className="flex justify-center gap-1 text-xs font-medium"
        pageLinkClassName="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
        activeClassName="block h-8 w-8 rounded border-teal-600 bg-teal-600 text-center leading-8 text-white"
        nextClassName="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        previousClassName="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        pageRangeDisplayed={3}
        pageCount={10}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </Container>
  );
};

export default ProductCatalog;

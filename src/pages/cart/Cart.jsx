import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";

function Cart() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const handleRemoveFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const totalPrice = cartItems.reduce(
    (accumulator, currentItem) => accumulator + currentItem.price,
    0
  );

  return (
    <Container>
      <div className="cart">
        <h1 className="cart__title">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="cart__empty-message">Your cart is empty.</p>
        ) : (
          <div className="cart__items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart__item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart__item-image"
                />
                <div className="cart__item-details">
                  <h2 className="cart__item-title">{item.title}</h2>
                  <p className="cart__item-price">${item.price.toFixed(2)}</p>
                  <button
                    className="cart__item-remove"
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="cart__total">
              <h2 className="cart__total-text">Total:</h2>
              <p className="cart__total-price">${totalPrice.toFixed(2)}</p>
            </div>
            <Link to="/checkout" className="cart__checkout-button">
              Checkout
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Cart;

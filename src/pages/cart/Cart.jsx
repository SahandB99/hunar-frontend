import React from "react";
import { useCart } from "react-use-cart";
import Container from "../../components/container/Container";
import "./Cart.styles.css"

const Cart = () => {
  const { 
    isEmpty,
    totalUniqueItems, 
    items, 
    totalItems, 
    cartTotal, 
    updateItemQuantity, 
    removeItem, 
    emptyCart} = useCart();

    if(isEmpty) return (
    <Container>
      <div className="header-info">
        <h1 className="text-red-600 text-3xl">Your cart is empty</h1>
        <p className="font-semibold">Try adding some products to your cart and come back again</p>
      </div>
    </Container>
    )

  return(
    <Container>
    <section>
    <div className="cart-container">
      <table className="cart-table">
        <thead>
        <tr>
        <th>Item Image</th>
        <th>Item Name</th>
        <th>Item Details</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Edit item</th>
      </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return(
              <tr key={index}>
                <td><img src={item.imgUrl} alt="" /></td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td className="item-price">${item.price}</td>
                <td className="item-quantity">{item.quantity}</td>
                <td>
                  <div className="edit-buttons">
                  <button className="quantity-btn-minus" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                  <button className="quantity-btn-plus" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove Item</button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    <div className="cart-details">
      <h5>Cart Unique Items: {totalUniqueItems}</h5>
      <h5>Total Items: {totalItems}</h5>
      <h2 className="item-total">Total Price: ${cartTotal}</h2>
    </div>
    <div className="cart-buttons">
      <button className="clear-btn" onClick={() => emptyCart()}>Clear Cart</button>
      <button className="buy-btn">Buy Now</button>
    </div>
    </section>
    </Container>
  )
}
export default Cart
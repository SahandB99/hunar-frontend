import React from 'react';
import './Footer.style.css';
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../../redux/themeSlice";
import Button from "../button/Button";
import { logout } from "../../redux/userSlice";

function Footer() {
    const isDark = useSelector((state) => state.theme.isDark);
    const user = useSelector((state) => state.user.data);
    const dispatch = useDispatch();

  return (
    <div className="footer">
      <div className="footer-info">
        <h2>About Us</h2>
        <p>We are an online art marketplace that connects buyers and sellers of unique and beautiful artworks. Our mission is to make art accessible to everyone, while supporting talented artists from around the world.</p>
      </div>
      <div className="footer-links">
        <h2>Quick Links</h2>
        <ul>
          <li>
            <input
              type="checkbox"
              checked={isDark}
              id="darkMode"
              onChange={() => dispatch(changeTheme())}
            />
            <label>Dark</label>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/productCatalog">Arts</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart</NavLink>
          </li>
          <li>
            {user.email ? (
              <Button text="Logout" handleClick={() => dispatch(logout())} />
            ) : (
              <Link to="/login">
                <Button text="Login" />
              </Link>
            )}
          </li>
        </ul>
      </div>
      <div className="footer-contact">
        <h2>Contact Us</h2>
        <ul>
          <li>Email: info@myartmarketplace.com</li>
          <li>Phone: 123-456-7890</li>
          <li>Address: 123 Main Street, Anytown USA</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
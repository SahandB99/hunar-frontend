import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/images/hunar-Logo.png";
import Button from "../button/Button";
import Container from "../container/Container";
import { changeTheme } from "../../redux/themeSlice";
import { logout } from "../../redux/userSlice";
import { useState } from "react";
import "./Navbar.css"

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  const isDark = useSelector((state) => state.theme.isDark);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <Container>
        <Link className="logo" to="/">
          <img src={logo} alt="Hunar Logo" />
          <h1 className="logo-name">Hunar</h1>
        </Link>
        <div className="menu-icon" onClick={handleShowNavbar}>
        <svg viewBox="0 0 100 80" width="40" height="40">
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
        </div>
        <div className={`nav-elements ${showNavbar && "active"}`}>
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
      </Container>
    </nav>
  );
}

export default Navbar;

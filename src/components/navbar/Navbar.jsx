import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/images/hunar-Logo.png";
import Container from "../container/Container";
// import { changeTheme } from "../../api/globalSlices/themeSlice";
import { useState } from "react";
import "./Navbar.css";
import { addUser } from "../../api/globalSlices/user.slices";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const [isDark, setIsDark] = useState(false);

  const { user } = useSelector((state) => state.user);
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
                onChange={() => setIsDark(!isDark)}
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
              {user ? (
                <button
                  className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  onClick={(e) => {
                    localStorage.removeItem("access_token");
                    dispatch(addUser(null));
                  }}
                >
                  logout
                </button>
              ) : (
                <>
                  <Link
                    className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                    to="/login"
                  >
                    Login
                  </Link>

                  <Link
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block"
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;

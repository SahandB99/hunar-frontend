import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Product from "./pages/articles/Product";
import NotFound from "./pages/NotFound";
import ProductCatalog from "./pages/productCatalog/ProductCatalog";
import Cart from "./pages/cart/Cart";
import { CartProvider } from "react-use-cart";
import Footer from "./components/footer/Footer";
import Register from "./pages/register/Register";
import { useGetCurrentUserQuery } from "./api/auth";
import Protected from "./pages/protected/Protected";
import NotAuthorized from "./pages/protected/NotAuthorized";
import { addUser } from "./api/globalSlices/user.slices";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [isDark, setIsDark] = useState(false);

  const { data, isError, isSuccess, isLoading } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addUser(data.data.user));
    }
  }, [data]);

  return (
    <div className={isDark ? "bg-dark" : ""}>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/403" element={<NotAuthorized />} />

          <Route path="/" element={<Protected user={user} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/productCatalog">
            <Route index element={<ProductCatalog />} />
            <Route path=":id" element={<Product />} />
          </Route>

          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;

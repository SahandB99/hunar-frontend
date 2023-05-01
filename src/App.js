import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Product from "./pages/articles/Product";
import AddArticle from "./pages/articles/AddArticle";
import NotFound from "./pages/NotFound";
import ProductCatalog from "./pages/productCatalog/ProductCatalog";
import Cart from "./pages/cart/Cart";
import { CartProvider } from "react-use-cart";
import Footer from "./components/footer/Footer";

function App() {
  const isDark = useSelector((state) => state.theme.isDark);

  return (
    <div className={isDark ? "bg-dark" : ""}>
      <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/productCatalog">
          <Route index element={<ProductCatalog />} />
          <Route path=":id" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
      </CartProvider>
    </div>
  );
}

export default App;

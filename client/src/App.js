import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="navbar">
        <h2>ShopEasy</h2>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>

          <div className="cart">
            Cart: {cartCount}
          </div>
        </div>
      </div>

      <h1 className="title">
        My E-commerce Store
      </h1>

      <div className="products">
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
            />

            <h2>{product.name}</h2>

            <p>₹{product.price}</p>

            <button
              onClick={() => {
                setCartCount(cartCount + 1);

                setCartItems([
                  ...cartItems,
                  product
                ]);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>
        Cart Items
      </h2>

      {cartItems.map((item, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px"
          }}
        >
          {item.name} - ₹{item.price}
        </div>
      ))}

      <h2>
        Total: ₹
        {cartItems.reduce(
          (total, item) =>
            total + item.price,
          0
        )}
      </h2>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// Home.jsx
import { useContext } from "react";
import { ProductContext } from "./context/ProductContext";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route , Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { ShoppingCart, Star, Truck, ShieldCheck, Headphones , User } from "lucide-react";


const Home = () => {
  const { products } = useContext(ProductContext);
  const [cartCount, setCartCount] = useState(
  JSON.parse(localStorage.getItem("cart"))?.length || 0
);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState(
  JSON.parse(localStorage.getItem("cart")) || []
);
  const totalPrice = cartItems.reduce(
  (total, item) =>
    total +
    Number(item.price.replace("$", "")) *
      item.quantity,
  0
);
const [cartOpen, setCartOpen] = useState(false);
const [isLoggedIn] = useState(
  !!localStorage.getItem("token")
);
const [profileOpen, setProfileOpen] = useState(false);
const [search, setSearch] = useState("");
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>        
          <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-indigo-600">ShopSphere</h1>

        <div className="hidden md:flex items-center gap-8 font-medium">
  <Link to="/" className="hover:text-indigo-600 transition">
    Home
  </Link>

  <Link to="/" className="hover:text-indigo-600 transition">
    Products
  </Link>

  <Link to="/" className="hover:text-indigo-600 transition">
    About
  </Link>

  <Link to="/" className="hover:text-indigo-600 transition">
    Contact
  </Link>

  <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="px-4 py-2 rounded-full border outline-none"
/>
 {isLoggedIn ? (
  <button
    onClick={() => {
      localStorage.removeItem("token");
      window.location.reload();
    }}
    className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition"
  >
    Logout
  </button>
) : (
  <>
    <Link
      to="/login"
      className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition"
    >
      Register
    </Link>
  </>
)}
</div>
      <div className="flex items-center gap-4">

  <div className="relative">

  <button
    onClick={() => setProfileOpen(!profileOpen)}
    className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition"
  >
    <User size={22} />
  </button>

  {profileOpen && (
    <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl p-3 z-50">

      <button className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-xl">
        My Profile
      </button>

      <button className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-xl">
        Orders
      </button>

      <button className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-xl">
        Wishlist
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
        className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl"
      >
        Logout
      </button>

    </div>
  )}

</div>

  <button
    onClick={() => setCartOpen(true)}
    className="relative"
  >
    <ShoppingCart size={28} />

    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
      {cartCount}
    </span>
  </button>

</div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Discover The Best Products Online
            </h1>

            <p className="mt-6 text-lg text-gray-200">
              Shop the latest fashion, electronics, accessories, and more with
              amazing discounts.
            </p>

            <button className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
              Shop Now
            </button>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f"
              alt="Shopping"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
<section className="max-w-7xl mx-auto py-20 px-8">
  <div className="flex justify-between items-center mb-10">
    <h2 className="text-4xl font-bold">Featured Products</h2>

    <button className="text-indigo-600 font-semibold hover:underline">
      View All
    </button>
  </div>

  <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {products
  .filter((product) =>{
    if (search === ""){
      return true;
    }
    return product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  })
  .map((product) => (
      <motion.div
  key={product.id}
  onClick={() => setSelectedProduct(product)}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
  className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl"
>

        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover"
        />

        <div className="p-5">
          <h3 className="text-xl font-semibold">{product.name}</h3>

          <div className="flex items-center gap-1 mt-2">
            <Star className="text-yellow-400 fill-yellow-400" size={18} />
            <span className="text-gray-600">{product.rating}</span>
          </div>

          <div className="flex justify-between items-center mt-5">
            <p className="text-2xl font-bold text-indigo-600">
              {product.price}
            </p>

            <button
  onClick={(e) => {
    e.stopPropagation();
  setCartCount(cartCount + 1);
const updatedCart = [
  ...cartItems,
  {
    ...product,
    quantity: 1,
  },
];

setCartItems(updatedCart);

localStorage.setItem(
  "cart",
  JSON.stringify(updatedCart)
);
  toast.success("Product added to cart!");
}}
  className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition"
>
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    ))}

    {products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    ).length === 0 && (
      <p className="text-center text-gray-500 text-xl col-span-full">
        No products found
      </p>
    )}

  </div>
</section>
      {/* Features */}
      <section className="max-w-7xl mx-auto py-16 px-8 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
          <Truck className="text-indigo-600 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
          <p className="text-gray-600">
            Get free delivery on all orders above $50.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
          <ShieldCheck className="text-indigo-600 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
          <p className="text-gray-600">
            100% secure and trusted payment methods.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
          <Headphones className="text-indigo-600 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
          <p className="text-gray-600">
            Our support team is always ready to help you.
          </p>
        </div>
      </section>
      {/* Product Details Modal */}
{selectedProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
    <div className="bg-white rounded-3xl max-w-4xl w-full grid md:grid-cols-2 overflow-hidden relative">

      <button
        onClick={() => setSelectedProduct(null)}
        className="absolute top-4 right-4 text-2xl font-bold"
      >
        ×
      </button>

      <img
        src={selectedProduct.image}
        alt={selectedProduct.name}
        className="h-full w-full object-cover"
      />

      <div className="p-8 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-4">
          {selectedProduct.name}
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <Star className="text-yellow-400 fill-yellow-400" />
          <span>{selectedProduct.rating}</span>
        </div>

        <p className="text-gray-600 mb-6">
          Premium quality product with modern design and excellent performance.
        </p>

        <h3 className="text-3xl font-bold text-indigo-600 mb-6">
          {selectedProduct.price}
        </h3>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setCartCount(cartCount + 1);
            const updatedCart = [
  ...cartItems,
  {
    ...selectedProduct,
    quantity: 1,
  },
];
            setCartItems(updatedCart);
localStorage.setItem(
  "cart",
  JSON.stringify(updatedCart)
);
            toast.success("Product added to cart!");
          }}
          className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition"
        >
          Add To Cart
        </button>
      </div>
    </div>
  </div>
)}
      {/* Newsletter */}
      <section className="bg-indigo-600 text-white py-20 px-8 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold">
            Subscribe For Latest Updates
          </h2>

          <p className="mt-4 text-gray-200">
            Get exclusive offers and latest product updates directly in your inbox.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full text-black w-full md:w-96 outline-none"
            />

            <button className="bg-black px-8 py-4 rounded-full hover:bg-gray-900 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-10 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              ShopSphere
            </h2>

            <p>
              Modern ecommerce platform for shopping the best products online.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>Help Center</li>
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>Instagram</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10 border-t border-gray-700 pt-6">
          © 2026 ShopSphere. All rights reserved.
        </div>
      </footer>
      {/* Cart Sidebar */}
<div
  className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
    cartOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex justify-between items-center p-6 border-b">
    <h2 className="text-2xl font-bold">Shopping Cart</h2>

    <button
      onClick={() => setCartOpen(false)}
      className="text-3xl"
    >
      ×
    </button>
  </div>

  <div className="p-6 space-y-4 overflow-y-auto h-[75%]">
    {cartItems.length === 0 ? (
      <p className="text-gray-500">Your cart is empty.</p>
    ) : (
      cartItems.map((item, index) => (
        <div
          key={index}
          className="flex gap-4 items-center border rounded-2xl p-3"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-xl"
          />

          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">
  Quantity: {item.quantity}
</p>
            <p className="text-indigo-600 font-bold">
              {item.price}
            </p>
            <button
  onClick={() => {
    const updatedCart = cartItems.filter(
      (_, i) => i !== index
    );

    setCartItems(updatedCart);
    setCartCount(updatedCart.length);
  }}
  className="text-red-500 text-sm mt-2"
>
  Remove
</button>
<p className="text-indigo-600 font-bold">
  {item.price}
</p>
          </div>
        </div>
      ))
    )}
  </div>

 <div className="absolute bottom-0 left-0 w-full p-6 border-t bg-white">

  <div className="flex justify-between mb-4 text-xl font-bold">
    <span>Total:</span>
    <span>${totalPrice}</span>
  </div>

  <button
  onClick={() => {
    toast.success("Order Placed Successfully!");
    setCartItems([]);
    localStorage.removeItem("cart");
    setCartCount(0);
    setCartOpen(false);
  }}
  className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition"
>
  Checkout
</button>

</div>
</div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
      </ProtectedRoute>
     }
/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
  </BrowserRouter>
);
};

export default Home;
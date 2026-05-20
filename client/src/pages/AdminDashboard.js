import { useState } from "react";
import { Trash2 } from "lucide-react";

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addProduct = () => {
    if (!name || !price || !image) return;

    const newProduct = {
      id: Date.now(),
      name,
      price,
      image,
    };

    setProducts([...products, newProduct]);

    setName("");
    setPrice("");
    setImage("");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-indigo-600 mb-10">
        Admin Dashboard
      </h1>

      {/* Add Product Form */}
      <div className="bg-white p-8 rounded-3xl shadow-lg mb-10 max-w-3xl">

        <h2 className="text-2xl font-bold mb-6">
          Add Product
        </h2>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-4 border rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-5 py-4 border rounded-xl outline-none"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-5 py-4 border rounded-xl outline-none"
          />

          <button
            onClick={addProduct}
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition"
          >
            Add Product
          </button>

        </div>
      </div>

      {/* Products List */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >

            <img
              src={product.image}
              alt={product.name}
              className="h-64 w-full object-cover"
            />

            <div className="p-5">

              <h3 className="text-xl font-bold">
                {product.name}
              </h3>

              <p className="text-indigo-600 font-bold text-2xl mt-2">
                ${product.price}
              </p>

              <button
                onClick={() => deleteProduct(product.id)}
                className="mt-5 bg-red-500 text-white px-5 py-3 rounded-xl hover:bg-red-600 transition flex items-center gap-2"
              >
                <Trash2 size={18} />
                Delete
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default AdminDashboard;
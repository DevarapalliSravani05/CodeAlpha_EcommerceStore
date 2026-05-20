import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration successful! Please login.");
      window.location.href="/login";
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
          Register
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-5 py-4 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-5 py-4 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-4 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleRegister}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition"
          >
            Register
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-semibold">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
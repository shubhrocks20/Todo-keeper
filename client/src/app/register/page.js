"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  if (localStorage.getItem("access_token")) {
    router.push("/dashboard");
  }

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Registration failed");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error happened", error);
      setError("An error occurred");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      {/* Login Button */}
      <button
        onClick={() => router.push("/login")}
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
      >
        Login
      </button>

      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Register</h1>
        <form
          className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-black"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              name="name"
              required
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="johndoe@gmail.com"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              name="email"
              required
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              required
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md font-semibold shadow-md hover:bg-green-600 transition duration-300"
          >
            Register
          </button>
          {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

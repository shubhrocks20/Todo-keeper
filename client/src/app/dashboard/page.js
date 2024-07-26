"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    id: "",
  });
  const router = useRouter();

  if (!localStorage.getItem("access_token")) {
    return router.push("/login");
  }

  useEffect(() => {
    const fetch_data = async () => {
      const access_token = localStorage.getItem("access_token");

      try {
        const response = await fetch("http://localhost:4000/api/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const result = await response.json();
        if (!response.ok) {
          console.log(result);
        } else {
          setData({
            name: result.name,
            email: result.email,
            id: result._id,
          });
        }
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetch_data();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  const handleTodos = () => {
    router.push("/todos");
  };

  return (
    <div className="flex flex-col gap-20 items-center h-screen bg-gray-100">
      <div className="w-full flex justify-between items-center p-4 bg-blue-500 text-white">
        <button
          onClick={handleTodos}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
        >
          Todos
        </button>
        <h1 className="text-4xl text-orange-200 font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full mt-8">
        <div className="mb-4">
          <label className="block text-gray-600">Name:</label>
          <h1 className="text-2xl text-gray-700 font-bold">{data.name}</h1>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">ID:</label>
          <h4 className="text-gray-700">{data.id}</h4>
        </div>
        <div>
          <label className="block text-gray-600">Email:</label>
          <p className="text-gray-700">{data.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

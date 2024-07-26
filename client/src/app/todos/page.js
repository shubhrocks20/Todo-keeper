"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Todo from "./todo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const router = useRouter();

  if (!localStorage.getItem("access_token")) {
    return router.push("/login");
  }
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      router.push("/login");
    }

    const fetchTodos = async () => {
      const response = await fetch("http://localhost:4000/api/read", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        console.error(result);
      } else {
        setTodos(result);
      }
    };

    fetchTodos();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const fetchTodos = async (access_token) => {
    const response = await fetch("http://localhost:4000/api/read", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      console.error(result);
    } else {
      setTodos(result);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://localhost:4000/api/createTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${access_token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        console.log(result);
      } else {
        setFormData({
          title: "",
          description: "",
        });
        fetchTodos(access_token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const access_token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://localhost:4000/api/deleteTodo/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${access_token}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        console.log(result);
      } else {
        fetchTodos(access_token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <header className="bg-blue-600 text-white py-6 shadow-md mb-6">
        <div className="container mx-auto flex justify-between items-center px-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
          >
            Dashboard
          </button>
          <h1 className="text-3xl font-bold">Todos</h1>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Todo Maker Form */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-6 text-black">
          <h2 className="text-2xl font-semibold mb-4">Add New Todo</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-600">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md "
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Add Todo
            </button>
          </form>
        </section>

        {/* Todos List */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black">Your Todos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {todos.map((todo) => (
              <Todo
                key={todo._id}
                id={todo._id}
                title={todo.title}
                description={todo.description}
                author={todo.author.name}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Todos;

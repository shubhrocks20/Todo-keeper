"use client";
import React, { useState } from "react";

const TodoForm = ({ result, setUpdatingTodo, fetchTodos }) => {
  const [formData, setFormData] = useState(result);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    const access_token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://localhost:4000/api/todo/${formData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${access_token}`,
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        console.log(result);
      } else {
        fetchTodos(access_token);
        setUpdatingTodo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="bg-white shadow-lg rounded-lg p-6 mb-6 text-black">
        <h2 className="text-2xl font-semibold mb-4">Update the Todo</h2>
        <form onSubmit={handleUpdateTodo}>
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
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default TodoForm;

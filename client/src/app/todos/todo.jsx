"use client";
import React from "react";

const Todo = ({ id, title, description, author, handleDelete }) => {
  return (
    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-6 mb-4 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4 h-24">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-gray-500 italic">By {author}</span>
        <button
          className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600"
          onClick={() => {
            handleDelete(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;

import React, { useState } from "react";
import "./NewPostForm.css";
import "../App.css";

function NewPostForm({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, body, userId: 1 }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      onPostCreated(data);

      setTitle("");
      setBody("");
      setError("");
    } catch {
      setError("Failed to create post.");
    }
  };

  return (
    <div className="form-card">
      <h2 className="section-title">Create Post</h2>

      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />

        <textarea
          placeholder="Post body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="form-textarea"
        />

        <button type="submit" className="primary-button">
          Create Post
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default NewPostForm;
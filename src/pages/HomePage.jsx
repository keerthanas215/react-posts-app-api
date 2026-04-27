import React, { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import NewPostForm from "../components/NewPostForm";
import "./HomePage.css";
import "../App.css";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data.slice(0, 10));
    } catch (err) {
      setError("Posts could not be loaded. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [{ ...newPost, id: Date.now() }, ...prev]);
  };

  return (
    <div className="container">
      <h1 className="page-title">Posts App</h1>

      <NewPostForm onPostCreated={handlePostCreated} />

      <div className="card">
        <h2 className="section-title">Posts</h2>

        {loading && <p className="loading">Loading posts...</p>}

        {error && (
          <div className="info-box">
            <p className="error">{error}</p>
            <button className="primary-button" onClick={fetchPosts}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {posts.length > 0 ? (
              <ul className="post-list">
                {posts.map((post) => (
                  <PostItem key={post.id} post={post} />
                ))}
              </ul>
            ) : (
              <p className="empty-message">No posts available.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
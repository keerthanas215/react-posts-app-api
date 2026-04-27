import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetailsPage.css";
import "../App.css";

function PostDetailsPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setPost(data);
      } catch {
        setError("Could not load post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <div className="container">
      <div className="card">
        <h1 className="section-title">Post Details</h1>

        {loading && <p className="loading">Loading post details...</p>}
        {error && <p className="error">{error}</p>}

        {post && (
          <>
            <p className="details-meta">Post ID: {post.id}</p>
            <h2 className="details-title">{post.title}</h2>
            <p className="details-body">{post.body}</p>
          </>
        )}

        <button className="secondary-button" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default PostDetailsPage;
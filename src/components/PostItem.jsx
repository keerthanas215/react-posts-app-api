import React from "react";
import { Link } from "react-router-dom";
import "./PostItem.css";

function PostItem({ post }) {
  return (
    <li className="post-item">
      <Link to={`/posts/${post.id}`} className="post-link">
        <h3>{post.title}</h3>
      </Link>
      <p className="post-body">{post.body}</p>
    </li>
  );
}

export default PostItem;
import React from 'react';
import { Link } from 'react-router-dom';
import "../style.css"

const BlogPost = ({ post, onDelete, onPublish }) => {
  const status = {
    PUBLISHED: (
      <button className="publish-button">
        <Link to={`/view/${post.id}`}>View Published Blog</Link>
      </button>
    ),
    CREATED: (
      <button className="publish-button" onClick={() => onPublish(post.id)}>
        Publish
      </button>
    ),
  };

  return (
    <div className="blog-post-card">
      <h2 className="blog-post-title">{post.header}</h2>
      <p className="blog-post-content">{post.paragraphs[0]}</p>
      <button className="edit-button">
        <Link to={`/edit/${post.id}`}>Edit</Link>
      </button>
      <button className="delete-button" onClick={() => onDelete(post.id)}>
        Delete
      </button>
      {status[post.status]}
    </div>
  );
};

export default BlogPost;

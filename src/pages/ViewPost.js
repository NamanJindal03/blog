import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost } from '../services/mockApi';
import '../style.css'; 

const ViewPost = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState('');

  async function getBlog(id) {
    setLoading(true);
    const blogPostData = await fetchPost(id);
    console.log(blogPostData);
    setBlogPost(blogPostData);
    setLoading(false);
  }

  useEffect(() => {
    getBlog(id);
  }, []);

  return (
    <div className="view-post-container">
      {loading ? (
        'Loading...'
      ) : !blogPost ? (
        'Error Finding the blog'
      ) : (
        <div className="blog-post">
          <header className="view-post-header">{blogPost.header}</header>
          {blogPost.paragraphs.map((paragraph, id) => {
            if (paragraph) {
              return (
                <p key={id} className="view-post-paragraph">
                  {paragraph}
                </p>
              );
            }
            return null;
          })}
          <footer className="view-post-footer">{blogPost.footer}</footer>
        </div>
      )}
    </div>
  );
};

export default ViewPost;

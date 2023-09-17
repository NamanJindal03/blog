import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import {fetchAllPosts} from '../services/mockApi'
import { deletePost, publishPost } from '../services/mockApi';
import "../style.css"

const AllBlogPosts = () => {
    const [loading, setLoading] = useState(true)
  const [blogPosts, setBlogPosts] = useState([]);

  async function getAllBlogPosts(){
    setLoading(true)
    const blogPostsData = await fetchAllPosts()
    setBlogPosts(blogPostsData)
    setLoading(false)
  }
  const onPublish = async (postId) => {
    try {
      await publishPost(postId);
      setBlogPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, status: 'PUBLISHED' } : post
        )
      );
    } catch (error) {
      console.error('Error publishing post:', error);
    }
  };

  const onDelete = async (postId) => {
    try {
      await deletePost(postId);
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
  useEffect(() => {
    getAllBlogPosts()
  }, []);

  return (
    <div className="blog-posts-container">
        {loading ? (
            'Loading...'
        ) : blogPosts.length === 0 ? (
            'No blog post to show'
        ) : (
            blogPosts.map((post) => (
            <BlogPost
                key={post.id}
                post={post}
                onDelete={onDelete}
                onPublish={onPublish}
            />
            ))
        )}
    </div>
  );
};

export default AllBlogPosts;
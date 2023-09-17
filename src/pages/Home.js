import React from 'react';
import AllBlogPosts from '../components/AllBlogPosts';
import { Link } from 'react-router-dom';
import '../style.css';
function Home() {


    return (
        <div>
            <div className='homeHead'>
                <h1>All Blog Posts</h1>
                <Link to="/create">Create Blog</Link>
            </div>
            
            <AllBlogPosts  />
        </div>
    );
}
export default Home;

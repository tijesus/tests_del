import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import postsData from '../../data/Posts.json'; // Import your JSON data here
import './Blog.css'; // Your CSS for the blog page

const Blog = ({ user }) => {
  const [posts, setPosts] = useState([]);

  // Load posts from posts.json or your API
  useEffect(() => {
    setPosts(postsData); // Replace with API call if needed
  }, []);

  return (
    <div className="blog-page">
      {/* Add a console log to check if the user is passed */}
      {console.log('User:', user)}

      {/* Top-left "Create Post" button, visible only if the user is logged in */}
      {user ? (
        <div className="create-post-button">
          <Link to="/create-post">Create Post</Link>
        </div>
      ) : (
        <p>Please log in to create a post.</p>
      )}

      {/* Display all posts from the data */}
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <div className="post-image-container">
              <img src={post.image} alt={post.title} className="post-image" />
            </div>
            <div className="post-content">
              <h2>{post.title}</h2>
              <div className="post-meta">
                <div className="author-info">
                  <img src={post.authorPic} alt={post.author} className="author-pic" />
                  <span>{post.author}</span>
                </div>
                <div className="post-timestamp">
                  <span>Published: {post.published_date}</span>
                  <span>Reading Time: {post.reading_time}</span>
                </div>
              </div>
              <p>{post.content}</p>
              <div className="post-actions">
                <Link to={`/posts/${post.id}`} className="read-more-button">Read More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

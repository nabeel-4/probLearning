import React from 'react';

const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <h4>{post.title}</h4>
          <h4>{post.views}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;

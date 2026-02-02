import React from 'react';

const BlogCard = ({ blog, onReadMore }) => {
  return (
    <div 
      onClick={() => onReadMore(blog.slug)}
      className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      {blog.image && (
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="text-xs text-gray-500 uppercase mb-1">{blog.category}</div>
        <h3 className="font-bold text-lg mb-2">{blog.title}</h3>
        <p className="text-gray-700 text-sm mb-3">
          {blog.content.substring(0, 150)}...
        </p>
        <div className="text-xs text-gray-500">
          By {blog.user?.name} · {new Date(blog.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

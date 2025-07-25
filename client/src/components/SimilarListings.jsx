import React from 'react';
import { Link } from 'react-router-dom';

export default function SimilarBlogs({ blogs = [] }) {
  if (!blogs.length) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-[#1F2E54] mb-6">
        Outros artigos que podem interessar
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <Link
            to={`/blog/${blog._id}`}
            key={blog._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <img
              src={blog.image || '/sem-imagem.jpg'}
              alt={blog.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-[#1F2E54]">
                {blog.name.length > 50 ? blog.name.slice(0, 50) + '...' : blog.name}
              </h4>
              <p className="text-gray-600 mt-2 text-sm">
                {blog.category} · {new Date(blog.createdAt).toLocaleDateString('pt-PT')}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

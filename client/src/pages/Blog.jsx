import { useEffect, useState } from 'react';
import BlogItems from './BlogItems';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/blogs`, {
          credentials: 'include',
        });
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Erro ao carregar os blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8 text-center">
        Últimos Artigos do Blog
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum artigo disponível de momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogItems key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

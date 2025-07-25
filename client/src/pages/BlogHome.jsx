import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BlogHome() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/blog/get`, {
          credentials: 'include',
        });
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Erro ao carregar blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-10 text-center">
        Artigos do Blog
      </h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum artigo disponível de momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow hover:shadow-md transition duration-300 overflow-hidden"
            >
              {blog.imageUrls ? (
                <img
                  src={blog.imageUrls}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  Sem imagem
                </div>
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold text-slate-800 mb-2">
                  {blog.name || 'Sem título'}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {blog.description?.substring(0, 100) || 'Sem conteúdo'}...
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Ler mais →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

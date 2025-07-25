import { Link } from 'react-router-dom';

export default function SimilarBlogs({ blogs }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Artigos Relacionados</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow hover:shadow-md transition duration-300 overflow-hidden"
          >
            {blog.imageUrls ? (
              <img
                src={blog.imageUrls}
                alt={blog.name}
                className="w-full h-40 object-cover"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Sem imagem
              </div>
            )}

            <div className="p-4">
              <h3 className="text-md font-semibold text-slate-800 mb-2 line-clamp-2">
                {blog.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
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
    </div>
  );
}

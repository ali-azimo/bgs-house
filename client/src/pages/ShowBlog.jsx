import { useSelector } from 'react-redux';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function ShowBlog() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [showBlogError, setShowBlogError] = useState(false);
  const [userBlogs, setUserBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    try {
      setShowBlogError(false);
      setIsLoading(true);
      const res = await fetch(`${
          import.meta.env.VITE_API_KEY_ONRENDER}/api/user/blog/${currentUser._id}`,{
            credentials: 'include',
          });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Erro ao carregar postagens');

      setUserBlogs(data);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
      setShowBlogError(true);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser._id]);

  useEffect(() => {
    if (currentUser?._id) fetchBlogs();
  }, [currentUser?._id, fetchBlogs]);

  const handleBlogDelete = async (blogId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/blog/delete/${blogId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Erro ao apagar');

      setUserBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error('Erro ao apagar:', error.message);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-center text-3xl font-bold text-slate-800 mb-6">
        Minhas Publicações
      </h1>

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Carregando suas postagens...</p>
        </div>
      ) : (
        <>
          {showBlogError && (
            <p className="text-red-700 mt-5 text-center">
              Ocorreu um erro ao carregar as postagens.
            </p>
          )}

          {userBlogs.length === 0 && !showBlogError && (
            <p className="text-gray-600 text-center mt-10">
              Nenhuma postagem encontrada.
            </p>
          )}

          {userBlogs.length > 0 && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {userBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white shadow hover:shadow-md rounded-xl overflow-hidden transition duration-300 flex flex-col"
                >
                  <Link to={`/blog/${blog._id}`} className="block">
                    <img
                      src={blog.imageUrls[0] || '/placeholder.jpg'}
                      alt={blog.name}
                      className="h-40 w-full object-cover"
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-slate-800 font-semibold text-md hover:underline line-clamp-2"
                    >
                      {blog.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex justify-between mt-4">
                      <Link
                        to={`/update-blog/${blog._id}`}
                        className="text-green-600 text-sm hover:underline uppercase"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleBlogDelete(blog._id)}
                        className="text-red-600 text-sm hover:underline uppercase"
                      >
                        Apagar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div className="text-center mt-8">
        <Link
          to="/create-listing"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition"
        >
          + Criar Nova Publicação
        </Link>
      </div>
    </div>
  );
}

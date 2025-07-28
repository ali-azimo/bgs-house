import { useSelector } from 'react-redux';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function ShowGeneric({ type }) {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [showError, setShowError] = useState(false);
  const [userItems, setUserItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchItems = useCallback(async () => {
    try {
      setShowError(false);
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY_ONRENDER}/api/user/${type}/${currentUser._id}`,
        { credentials: 'include' }
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Erro ao carregar publicações');
      setUserItems(data);
    } catch (error) {
      console.error('Erro ao buscar publicações:', error);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser._id, type]);

  useEffect(() => {
    if (currentUser?._id) fetchItems();
  }, [currentUser?._id, fetchItems]);

  const handleDelete = async (itemId) => {
    const confirm = window.confirm('Tens certeza que deseja apagar?');
    if (!confirm) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_KEY_ONRENDER}/api/${type}/delete/${itemId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Erro ao apagar');
      setUserItems((prev) => prev.filter((item) => item._id !== itemId));
      setSuccessMessage('Apagado com sucesso.');

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erro ao apagar:', error.message);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-center text-3xl font-bold text-slate-800 mb-6">
        Minhas Publicações
      </h1>

      {successMessage && (
        <p className="text-green-600 text-center mb-4">{successMessage}</p>
      )}

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-600">Carregando suas publicações...</p>
        </div>
      ) : (
        <>
          {showError && (
            <p className="text-red-700 mt-5 text-center">
              Ocorreu um erro ao carregar as publicações.
            </p>
          )}

          {userItems.length === 0 && !showError && (
            <p className="text-gray-600 text-center mt-10">
              Nenhuma publicação encontrada.
            </p>
          )}

          {userItems.length > 0 && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {userItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white shadow hover:shadow-md rounded-xl overflow-hidden transition duration-300 flex flex-col"
                >
                  <Link to={`/${type}/${item._id}`} className="block">
                    <img
                      src={item.imageUrls[0] || '/placeholder.jpg'}
                      alt={item.name}
                      className="h-40 w-full object-cover"
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <Link
                      to={`/${type}/${item._id}`}
                      className="text-slate-800 font-semibold text-md hover:underline line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex justify-between mt-4">
                      <Link
                        to={`/update-${type}/${item._id}`}
                        className="text-green-600 text-sm hover:underline uppercase"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
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
          to={`/create-${type}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition"
        >
          + Criar Nova Publicação
        </Link>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AgriHome() {
  const [agrItems, setAgriItems] = useState([]);

  useEffect(() => {
    const fetchAgriItems = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/agri/get`, {
          credentials: 'include',
        });
        const data = await res.json();
        setAgriItems(data);
      } catch (error) {
        console.error('Erro ao carregar dados de Agricultura:', error);
      }
    };

    fetchAgriItems();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {agrItems.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum conteúdo agrícola disponível.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agrItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-md transition duration-300 overflow-hidden"
            >
              {item.imageUrls ? (
                <img
                  src={item.imageUrls}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  Sem imagem
                </div>
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold text-slate-800 mb-2">
                  {item.name || 'Sem título'}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {item.description?.substring(0, 100) || 'Sem conteúdo'}...
                </p>
                <Link
                  to={`/agri/${item._id}`}
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

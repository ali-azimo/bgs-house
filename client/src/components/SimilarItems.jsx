import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function SimilarItems({ type, id }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!type || !id) return;

    const fetchSimilar = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_KEY_ONRENDER}/api/sem/${type}/${id}`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Erro na resposta da API');
        }

        const data = await res.json();
        setItems(data || []);
      } catch (error) {
        console.error('Erro ao buscar semelhantes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [type, id]);

  if (loading) return <p className="text-gray-500">A carregar...</p>;
  if (!items.length) return <p className="text-gray-500">Nenhum item semelhante encontrado.</p>;

  // Mostrar os primeiros 10 ou todos
  const itemsToShow = showAll ? items : items.slice(0, 10);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {itemsToShow.map((item) => (
          // Aqui o Link para a rota do imóvel, ex: /imo/abc123
          <Link
            key={item._id}
            to={`/${type}/${item._id}`}
            className="block group"
          >
            <div className="w-full overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <img
                src={item.imageUrls?.[0] || '/placeholder.jpg'}
                alt={item.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="mt-2 text-sm text-gray-800 font-semibold truncate">{item.name}</p>
            {(item.address || item.location) && (
              <p className="flex items-center text-xs text-gray-500 truncate">
                <FaMapMarkerAlt className="mr-1" />
                {item.address || item.location}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* Botão mostrar mais/menos */}
      {items.length > 10 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            {showAll ? 'Mostrar menos' : 'Mostrar mais'}
          </button>
        </div>
      )}
    </div>
  );
}

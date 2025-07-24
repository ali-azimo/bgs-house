import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SimilarListings({ listing }) {
  const [similarListings, setSimilarListings] = useState([]);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const res = await fetch(`/api/listing/get?`); // ajuste se usar outro endpoint
        const data = await res.json();

        // Filtrar imóveis semelhantes com base no tipo e localização (exemplo simples)
        const filtered = data
          .filter(
            (item) =>
              item._id !== listing._id &&
              item.type === listing.type &&
              item.address?.includes(listing.address?.split(',')[0])
          )
          .slice(0, 3); // limitar a 3

        setSimilarListings(filtered);
      } catch (error) {
        console.error('Erro ao buscar imóveis semelhantes:', error);
      }
    };

    if (listing && listing._id) fetchSimilar();
  }, [listing]);

  if (similarListings.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Imóveis Semelhantes</h3>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {similarListings.map((similar) => (
          <div
            key={similar._id}
            className="bg-white shadow hover:shadow-md rounded-xl overflow-hidden transition duration-300 flex flex-col"
          >
            <div/>
            <img className='h-40 w-full object-cover'
                src={similar.imageUrls[0] || '/placeholder.jpg'} alt={similar.name} 
            />
            <div className="p-4">
              <h4 className="font-semibold text-lg text-slate-800">{similar.name}</h4>
              <p className="text-gray-600 text-sm mt-1">
                <FaMapMarkerAlt className="inline mr-1 text-green-600" />
                {similar.address?.substring(0, 40)}...
              </p>
              <div className="mt-3 flex justify-between items-center">
                {/* <span className="font-bold text-slate-800">
                  {similar.offer
                    ? similar.discountPrice.toLocaleString('pt-PT')
                    : similar.regularPrice.toLocaleString('pt-PT')} MZN
                </span> */}
                <Link
                  to={`/listing/${similar._id}`}
                  className="text-sm bg-slate-800 text-white px-3 py-1 rounded hover:bg-slate-900 transition"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useSelector } from 'react-redux';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function ShowListing() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchListings = useCallback(async () => {
    try {
      setShowListingError(false);
      setIsLoading(true);
      const res = await fetch(`${
          import.meta.env.VITE_API_KEY_ONRENDER}/api/user/listing/${currentUser._id}`,{
            credentials: 'include',
          });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Erro ao carregar postagens');

      setUserListings(data);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
      setShowListingError(true);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser._id]);

  useEffect(() => {
    if (currentUser?._id) fetchListings();
  }, [currentUser?._id, fetchListings]);

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Erro ao apagar');

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
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
          {showListingError && (
            <p className="text-red-700 mt-5 text-center">
              Ocorreu um erro ao carregar as postagens.
            </p>
          )}

          {userListings.length === 0 && !showListingError && (
            <p className="text-gray-600 text-center mt-10">
              Nenhuma postagem encontrada.
            </p>
          )}

          {userListings.length > 0 && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-white shadow hover:shadow-md rounded-xl overflow-hidden transition duration-300 flex flex-col"
                >
                  <Link to={`/listing/${listing._id}`} className="block">
                    <img
                      src={listing.imageUrls[0] || '/placeholder.jpg'}
                      alt={listing.name}
                      className="h-40 w-full object-cover"
                      loading="lazy"
                    />
                  </Link>

                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <Link
                      to={`/listing/${listing._id}`}
                      className="text-slate-800 font-semibold text-md hover:underline line-clamp-2"
                    >
                      {listing.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(listing.createdAt).toLocaleDateString()}
                    </p>

                    <div className="flex justify-between mt-4">
                      <Link
                        to={`/update-listing/${listing._id}`}
                        className="text-green-600 text-sm hover:underline uppercase"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleListingDelete(listing._id)}
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

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SimilarItems from '../components/SimilarItems';

export default function Minin() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/minin/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);

  if (!data) return <div>Carregando...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
      <p className="text-gray-700">{data.description}</p>

      <SimilarItems type="minin" id={data._id} />
    </div>
  );
}

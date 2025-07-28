import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ImoItems({ imo }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[270px]">
      <Link to={`/imo/${imo._id}`}>
        <img
          src={imo.imageUrls[0]}
          alt=""
          className="h-[180px] sm:h-[220px] w-full object-cover hover:scale-110 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">{imo.name}</p>

          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">{imo.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{imo.description}</p>

          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {imo.bedroom > 1 ? `${imo.bedroom} quartos` : `${imo.bedroom} quarto`}
            </div>
            <div className="font-bold text-xs">
              {imo.bathroom > 1 ? `${imo.bathroom} banheiros` : `${imo.bathroom} banheiro`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

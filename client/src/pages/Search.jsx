import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Listing from '../../../api/models/listar.model';

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        finished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const finishedFromUrl = urlParams.get('finished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            finishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ){
           setSidebardata({
            searchTerm: searchTermFromUrl || '',
            type: typeFromUrl || 'all',
            parking: parkingFromUrl === 'true' ? true : false,
            finished: finishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
           }); 
        }
        const fecthListings = async()=>{
            setShowMore(false);
            setLoading(true)
            const searchQuery = urlParams.toString();
            const res =await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if(data.length > 8){
                setShowMore(true);
            }else{
                setShowMore(false);
            }
            setListings(data);
            setLoading(false);
        }
        fecthListings();
    }, [location.search]);

    const handlerChange = (e) =>{
        if(
            e.target.id === 'all' || 
            e.target.id === 'rent' || 
            e.target.id === 'sale'
        ){
            setSidebardata({...sidebardata, type: e.target.id})
        }
        if(
            e.target.id === 'searchTerm'
        ){
            setSidebardata({...sidebardata, 
                searchTerm: e.target.value
            })
        }
        if(
            e.target.id === 'parking' || 
            e.target.id === 'finished' || 
            e.target.id === 'offer'
        ){
            setSidebardata({...sidebardata,[
                e.target.id]:
                e.target.checked || 
                e.target.checked === 'true' ? true : false,
            });
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({...sidebardata, sort, order});
        }
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('finished', sidebardata.finished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () =>{
        const numberOfListing = listings.length;
        const startIndex = numberOfListing;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if(data.length < 9){
            setShowMore(false);
        }
        setListings([...listings, ...data]);
    }
  return (
    <div className='flex flex-col md:flex-row'> 
        <div className="p-7 border-b-2 sm:border-r-2 md:min-h-screen">

            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap font-semibold'>
                        Search Term:</label>
                        <input type="text" 
                            id='searchTerm'
                            placeholder='Search...'
                            className='border rounded-lg p-3 w-full'
                            value={sidebardata.searchTerm}
                            onChange={handlerChange}
                        />
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'>Type:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="all" className='w-5 font-semibold'
                        onChange={handlerChange}
                        checked={sidebardata.type === 'all'}
                        />
                        <span className='font-semibold'>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="rent" className='w-5' 
                        onChange={handlerChange}
                        checked={sidebardata.type === 'rent'}
                        />
                        <span className='font-semibold'>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="sale" className='w-5'
                        onChange={handlerChange}
                        checked={sidebardata.type === 'sale'}
                        />
                        <span className='font-semibold'>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="offer" className='w-5' 
                        onChange={handlerChange}
                        checked={sidebardata.offer}
                        />
                        <span className='font-semibold'>Offer</span>
                    </div>
                    
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'>Amnenities:</label>
                    
                    <div className="flex gap-2">
                        <input type="checkbox" id="parking" className='w-5' 
                        onChange={handlerChange}
                        checked={sidebardata.parking}
                        />
                        <span className='font-semibold'>Parking</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="finished" className='w-5' 
                        onChange={handlerChange}
                        checked={sidebardata.finished}
                        />
                        <span className='font-semibold'>Finished</span>
                    </div>
                    
                </div>
                <div className="flex items-center gap-2">
                    <label className='font-semibold'>Sort:</label>
                    <select 
                        onChange={handlerChange}
                        defaultValue={'created_at_desc'}
                        id="sort_order"
                        className='border rounded-lg p-2'
                    >
                        <option value='regularPrice_desc'>Price high to low</option>
                        <option value='regularPrice_asc'>Price low to high</option>
                        <option value='createdAt_desc'>Latest</option>
                        <option value='createdAt_asc'>Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'>Search</button>
            </form>
        </div>
        <div className="flex-1">
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results</h1>

            <div className='p-7 flex flex-wrap gap-4'>
                {!loading && listings.length === 0 &&(
                    <p className='text-xl text-slate-700'>No listing found</p>
                )
                }
                {
                    loading && (
                        <p className='text-xl text-slate-700 text-center w-full'>loading</p>

                    )
                }
                {!loading &&
                    listings &&
                    listings.map((listing)=>(
                        <ListingItems key={listing._id} listing={listing}/>
                    ))}
                    {showMore && (
                        <button onClick={
                            onShowMoreClick
                        } className='text-green-700 hover:underline p-7 text-center w-full'>
                            Show more
                        </button>
                    )}

            </div>
        </div>
    </div>
  )
}
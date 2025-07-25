import {Link} from 'react-router-dom';
import {MdLocationOn} from 'react-icons/md';

export default function BlogItems({blog}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[270px]'>

        <Link to={`/blog/${listing._id}`}>
            <img src={blog.imageUrls[0]} alt='' 
            className='h-[180px] sm:h-[220] w-full object-cover hover:scale-110 transition-scale duration-300'
            />
            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'>{blog.name}</p>

                <div className='flex items-center gap-1'>
                    <MdLocationOn className='h-4 w-4 text-green-700'/>
                    <p className='text-sm text-gray-600 truncate w-full'>{blog.address}</p>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                    {blog.description}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                    {blog.timestamps}
                </p>
                
                
            </div>
        </Link>
    </div>
  )
}

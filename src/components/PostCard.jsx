import React from 'react';
import service from "../appwrite//conf"
import {Link} from 'react-router-dom'


function PostCard({
    $id,
    title,
    featured_image
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className=' w-64 h-56 bg-gray-300 rounded-xl p-2 mx-3'>
            <div className=' w-full justify-center items-center h-32 overflow-hidden border border-gray-800 rounded-xl'>
                <img src={service.getFilePreview(featured_image)} alt={title} className=' rounded-xl' />
            </div>
            <h2
            className=' text-lg font-bold py-4'>{title}</h2>
        </div>
    </Link>
  );
}


export default PostCard;

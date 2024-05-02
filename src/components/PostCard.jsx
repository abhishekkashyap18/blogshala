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
        <div className=' w-full bg-gray-300 rounded-xl p-2 mx-3'>
            <div className=' w-full justify-center mb-4'>
                <img src={service.getFilePreview(featured_image)} alt={title} className=' rounded-xl' />
            </div>
            <h2
            className=' text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  );
}


export default PostCard;

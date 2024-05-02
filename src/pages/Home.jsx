import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/conf";
import {Container, PostCard} from '../components'
// import authService from '../appwrite/auth';
import { useSelector } from 'react-redux';


function Home() {
    const [posts , setPosts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        appwriteService.getPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
        .finally(() => setLoading(false))
    } , [])
    
  const authStatus = useSelector((state) => state.auth.status)

  if(loading) return (
    <div className="flex justify-center items-center flex-col">
        <div className="h-20 w-20 rounded-full animate-spin border border-orange-500 my-4"> 
            <div className='bg-white w-2 h-2 rounded-full'></div>
        </div>
        <h1 className='text-xl text-white my-2'>Hold On Tight!! fetching your data.</h1>
    </div>
  )
  
  return(
    <div className=' w-full py-8'>
        <Container>
            {authStatus ? (
                posts?.length === 0 ? (
                    <h1>No post is there, create one</h1>
                ):(
            <div className='flex flex-wrap'>
                {posts?.map((post)=>(
                        <div key={post.$id} className=' py-2 w-1/4 mx-3'>
                            <PostCard {...post} />
                        <div/>
            </div>
   ))} {" "} </div>
                )
        ) : (
            <h1>Login to read the post</h1>
        )}
        </Container>
    </div>
  );
}

export default Home;

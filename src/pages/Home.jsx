import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/conf";
import {Container, PostCard} from '../components'
// import authService from '../appwrite/auth';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';


function Home() {
    const [posts , setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
            <div className='flex flex-wrap flex-col justify-center items-center sm:flex-row sm:justify-start'>
                {posts?.map((post)=>(
                        <div key={post.$id} className=' p-2'>
                            <PostCard {...post} />
                        <div/>
            </div>
   ))} {" "} </div>
                )
        ) : (
            <div className=" flex flex-col justify-center items-center h-screen">
                <h1 className=' sm:text-2xl text-white my-3'>Turn your Thoughts into <span className=' font-bold text-black hover:text-white'>&lt;captivating content!!&gt; </span></h1>
                <p className='text-white sm:w-[60%] text-center my-3 sm:font-medium px-4'>Discover a world of knowledge and inspiration. Our blog offers a diverse range of articles on topics that matter. we provide informative, engaging, and thought-provoking content. Join our community of readers and explore a wealth of ideas.</p>
                <h2 className='sm:text-xl border border-black text-white bg-black w-fit p-3 mt-3 rounded-md hover:bg-slate-800' onClick={()=> navigate("/signup")}>Signup to create and read blogs</h2>

                

            </div>
            
        )}
        </Container>
    </div>
  );
}

export default Home;

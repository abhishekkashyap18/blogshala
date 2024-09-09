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
            <div className='bg-black w-2 h-2 rounded-full'></div>
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

                <div className=" flex sm:flex-row h-screen flex-col">
                    <div className=' sm:w-[50%] h-96 w-full '>
                        <img src="th (11).jpeg" alt="Image" className='h-96' />
                    </div>
                    <div className='h-96 flex flex-col justify-center items-center my-5'> 
                        <h1 className='sm:text-4xl font-bold text-center'>Welcome to our not-so-secret diary</h1>
                        <h1 className=' sm:text-2xl text-black my-3 text-center font-semibold'>Pen down your thoughts!</h1>
                        <button className=' border border-orange-500 bg-orange-400 text-white rounded-md w-28 h-10 text-center my-3 hover:bg-orange-300' 
                        onClick={()=>navigate("/signup")}
                        >SignUP</button>
                    </div>
                </div>

                
        )}
        </Container>
    </div>
  );
}

export default Home;

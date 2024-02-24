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

  if(loading) return <h1>fetching your posts!!</h1>
  
  return(
    <div className=' w-full py-8'>
        <Container>
            {authStatus ? (
                posts?.length === 0 ? (
                    <h1>No post is there, create one</h1>
                ):(
            <div className='flex flex-wrap'>
                {posts?.map((post)=>(
                        <div key={post.$id} className=' py-2 w-1/4'>
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

import React, {useState , useEffect} from 'react';
import { Container, PostCard } from '../components';
import service from '../appwrite/conf';




function AllPosts() {
    const [loading, setLoading] = useState(false);
    
    const [post , setPost] = useState([])
    

    useEffect(() => {
        setLoading(true);
        service.getPosts().then((posts) => {
        if(posts){
            setPost(posts.documents)
            console.log(post)
        }  
    }).finally(() => setLoading(false))
    
},[])



    if(loading) return <h1>your post are loading</h1>
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
            {post.length !== 0 && post.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard  {...post} />
                </div>
            ))}
            </div>
            

        </Container>
      
    </div>
  );
}

export default AllPosts;

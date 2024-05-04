import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/conf";

function AllPosts() {
  const [loading, setLoading] = useState(false);

  const [post, setPost] = useState([]);

  useEffect(() => {
    setLoading(true);
    service
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPost(posts.documents);
          console.log(post);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center flex-col">
        <div className="h-20 w-20 rounded-full animate-spin border border-orange-500 my-4">
          <div className="bg-white w-2 h-2 rounded-full"></div>
        </div>
        <h1 className="text-xl text-white my-2">
          Hold On Tight!! fetching your data.
        </h1>
      </div>
    );

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap flex-col justify-center items-center sm:flex-row sm:justify-start" >
          {post.length !== 0 &&
            post.map((post) => (
              <div key={post.$id} className="p-2">
                <PostCard {...post} />
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;

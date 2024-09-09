import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../appwrite/conf.js";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(true);

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        setLoading(true);
        if (slug) {
            Service.getPost(slug).then((post) => {
                // console.log(post);
                if (post) setPost(post);
                else navigate("/");
            })
            .finally(()=> setLoading(false));
        } 
        // else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        Service.deletePost(post.$id).then((status) => {
            if (status) {
                Service.deleteFile(post.featured_image);
                navigate("/");
            }
        });
    };

    if(isLoading) return (
        <div className="flex justify-center items-center flex-col">
            <div className="h-20 w-20 rounded-full animate-spin border border-orange-500 my-4"> 
                <div className='bg-white w-2 h-2 rounded-full'></div>
            </div>
            <h1 className='text-xl text-white my-2'>Hold On Tight!! fetching your data.</h1>
        </div>
      )

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={Service.getFilePreview(post.featured_image)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 text-orange-500 text-center">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css text-black">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

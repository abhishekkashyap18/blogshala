import React , {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form'
import {Button, Input , Select , RTE} from '../index'
import service from '../../appwrite/conf'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
    const {register , handleSubmit , watch , setValue , control , getValues} = useForm({
        defaultValues:{
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active'
        },
    })

    const [isLoading , setLoading] = useState(false);
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
   

    const submit = async (data) => {
        setLoading(true);
        if(post){
           const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

            if(file){
                await service.deleteFile(post.featured_image)
            }

            const dbPost = await service.updatePost(post.$id,{
                ...data,
                featured_image: file? file.$id : undefined,

            });


            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else{
            const file = await service.uploadFile(data.image[0]);

            if(file){
                const fileId = file.$id
                data.featured_image = fileId
                const dbPost = await service.createPost({
                    ...data,
                    userID: userData.$id,
                });

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
        setLoading(false);
    };

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string')
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, '-')
        
        return "";

    },[])

        React.useEffect(()=>{
            const subscription = watch((value , {name})=> {
                if(name === 'title'){
                    setValue('slug', slugTransform(value.title), 
                        {shouldValidate: true})
                }
            });

            return () =>  subscription.unsubscribe();
        },[watch,slugTransform, setValue])

       {isLoading && <h1>fetching your data...</h1>} 

  return (

    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">

    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title should not be more than 36 character"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={service.getFilePreview(post.featured_image)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? isLoading? (
                <div className="flex justify-center items-center flex-col">
                <div className="h-5 w-5 rounded-full animate-spin border border-red-500 my-1">
                <div className="bg-black w-1 h-1 rounded-full"></div>
                </div>
                </div>) :"Update" : isLoading ? (
                <div className="flex justify-center items-center flex-col">
                <div className="h-5 w-5 rounded-full animate-spin border border-red-500 my-1">
                <div className="bg-black w-1 h-1 rounded-full"></div>
                </div>
                </div>) : "submit"}
        </Button>
        
    </div>
</form>
  );
}

export default PostForm;

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createPostAction, fetchPostAction, updatePostAction } from '../redux/features/post/post.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { TOASTER_STYLING_VALUES } from '../utils/config';
import { ToastContainer, toast } from 'react-toastify';

function CreatePost() {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const location = useLocation();
    const [title, setTitle]= useState('')
    const { post } = useSelector((state) => state.post);
    const { state } = location;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const notifyToaster=(data, condition) => {
      if (condition === "success") {
        
        toast.success(data, TOASTER_STYLING_VALUES);
      } else {
        toast.error(data, TOASTER_STYLING_VALUES);
      }
    }
 

    const moveToNext=() =>{
        setTimeout(() => {
            navigate('/posts')
        },1000)
    }
    function onSubmit(formData) {

        if(state) {
          dispatch(updatePostAction({id: state, formData, moveToNext, notifyToaster}))
        } else {
          dispatch(createPostAction({formData, moveToNext, notifyToaster}))
        }
        
    }


    useEffect(() => {
      if(state){
        setTitle('Edit Post')
        dispatch(fetchPostAction({id: state}))
      } else {
        setTitle('Create Post')
      }
    },[state])

    useEffect(() => {
        if(post){
          setValue('title', post.title);
          setValue('content', post.content);
        }
    },[post])
  

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
              placeholder="Enter post title"
            />
            {errors?.title && (
                <p className="text-[#d32f2f] mt-1">
                    Title is required
                </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
                {...register("content", { required: true })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter post content"
                rows="4"
            />
            {errors?.content && (
                <p className="text-[#d32f2f] mt-1">
                    Content is required
                </p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn-color text-white px-4 py-2 rounded"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
   
  );
}

export default CreatePost;

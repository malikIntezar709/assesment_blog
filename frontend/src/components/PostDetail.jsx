import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchPostAction } from '../redux/features/post/post.slice';

const PostDetail = ({ title, content }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { post } = useSelector((state) => state.post);
  console.log('post',post);
  
  const { state } = location;

  
  useEffect(() => {

    if(state) 
    { 
      dispatch(fetchPostAction({id:state}))
    }
  }, [state])
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl text-center">
        <h1 className="text-2xl font-bold mb-4">{post?.title}</h1>
        <p className="text-gray-700">{post?.content}</p>
      </div>
    </div>
  );
};

export default PostDetail;

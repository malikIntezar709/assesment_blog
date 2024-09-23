import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostAction, fetchAllPostsAction } from '../redux/features/post/post.slice';
import { useNavigate } from 'react-router-dom';
import { TOASTER_STYLING_VALUES } from '../utils/config';
import { ToastContainer, toast } from 'react-toastify';

function ProductList() {
    const dispatch = useDispatch();
    const navigate= useNavigate()
    const { posts, isDeleted } = useSelector((state) => state.post);
    
    const logedInUser=JSON.parse(localStorage.getItem("logedIn_user"));

    
    useEffect(() => {
      if(isDeleted){
        dispatch(fetchAllPostsAction())
      }
    },[isDeleted])

  const handleEdit = (id) => {
    navigate("/create/post", {
      state: id,
    });
  };

  const notifyToaster=(data, condition) => {
    if (condition === "success") {
      
      toast.success(data, TOASTER_STYLING_VALUES);
    } else {
      toast.error(data, TOASTER_STYLING_VALUES);
    }
  }

  const handleDelete = (id) => {
    dispatch(deletePostAction({id, notifyToaster}))
  };

  const handleView = (id) => {
    navigate("/post/view", {
      state: id,
    });
  };

  const handleAddPost = () => {
    navigate('/create/post')
  };

  useEffect(() => {
    dispatch(fetchAllPostsAction())
  },[])


  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        {/* Header with "Add Post" Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Product List</h2>
          {
            logedInUser?.role === 'admin' &&  <button
                onClick={handleAddPost}
                className="btn-color text-white px-4 py-2 rounded"
            >
                Add Post
            </button>
          }
          
        </div>

        {/* Table for Posts */}
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Content</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post,index) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{post.content}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleView(post._id)}
                    className="text-green-500 hover:text-green-700 font-semibold mr-4"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(post._id)}
                    className="text-blue-500 hover:text-blue-700 font-semibold mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
    
  );
}

export default ProductList;

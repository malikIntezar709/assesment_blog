import api from "../../../utils/api";

const fetchAllPosts = async () => {
  
  const response = await api.get(`/posts`);
  return response;
};


const createPost = async (post) => {
  const response = await api.post(`/posts`, post);
  return response;
};

const updatePost = async (id,post) => {
  const response = await api.put(`/posts/${id}`, post);
  return response;
};

const deletePost = async (id) => {
    const response = await api.delete(`/posts/${id}`);
    return response;
};
  


const fetchPost = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response;
};


const post = {
    fetchAllPosts,
    createPost,
    updatePost,
    deletePost,
    fetchPost
};

export default post;

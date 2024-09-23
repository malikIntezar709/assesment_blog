const Post = require('../models/Post');

const getAllPosts = async () => {

    const posts = await Post.find();

    return posts;
};

const getPostById = async (id) => {
   
  const post = await Post.findById(id);

  return post;
  
};

const createPost = async (title, content, authorId) => {
  const newPost = new Post({
    title,
    content,
    author: authorId, 
  });

  await newPost.save();
  return newPost;
};


const updatePost = async (postId, title, content) => {
 
  const post = await Post.findById(postId);
  
  if (!post) {
    throw new Error('Post not found');
  }

  post.title = title;
  post.content = content;

  const updatedPost = await post.save();

  return updatedPost; 
};

const deletePost = async (postId) => {

  const post = await Post.findById(postId);

  if (!post) {
    throw new Error('Post not found');
  }

  await post.deleteOne();

  return { message: 'Post deleted successfully' }; 
}


module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
}
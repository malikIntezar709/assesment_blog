const postService = require('../services/post');

const getAllPosts = async (req, res) => {
  try {

    const posts = await postService.getAllPosts();

    res.status(201).json({ 
        success: true, 
        message: 'All posts fetched successfully.',
        data: posts 
    });

    
  } catch (error) {

    res.status(500).json({
        success: false, 
        message: 'Error fetching posts.' 
    });
  }
};

const getPostById = async (req, res) => {
    try {

        const postId = req.params.id;
        const post = await postService.getPostById(postId);

        if(!post){
            res.status(404).json({ 
                success: false, 
                message: 'Post not found.',
                data: [] 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Post found successfully.',
            data: post
        });

    } catch (error) {

        res.status(500).json({ 
            success: false, 
            message: 'Post not found', 
        });
    }
};

const createPost = async (req, res) => {
    const { title, content } = req.body;
    const user = req.user; 
  
    if (user.role !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: 'Access denied. Only admin can create new posts.', 
        });
    }
  
    try {

        const post = await postService.createPost(title, content, user.id);
        res.status(201).json({ 
            success: true, 
            message: 'Post Created successfully.', 
            data: post
        });
      
    } catch (error) {
      
        res.status(500).json({ 
            success: false, 
            message: 'Server errror.', 
        });
    }
};

const updatePost = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const user = req.user; 
  
    if (user.role !== 'admin') {

        return res.status(403).json({ 
            success: false, 
            message: 'Access denied. Only admin can update posts.', 
        });
    }
  
    try {

        const updatedPost = await postService.updatePost(id, title, content);
        res.status(200).json({ 
            success: true, 
            message: 'Post updated successfully.',
            data: updatedPost 
        });

    } catch (error) {
        
        if (error.message === 'Post not found') {
            return res.status(404).json({ 
                success: false, 
                message: error.message,
            });
        
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Server error',
            });
        }
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
  
    if (user.role !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: 'Access denied. Admins only delete the post.', 
        });
    }
  
    try {
        const result = await postService.deletePost(id);
        res.status(200).json({ 
            success: true, 
            message: result.message, 
        });
    } catch (error) {
        console.log('error',error);
        
        if (error.message === 'Post not found') {
            return res.status(404).json({ 
                success: false, 
                message: 'Post not found', 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Server error', 
            });
        }
    }
};
  

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};

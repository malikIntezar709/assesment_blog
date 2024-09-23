/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import post from "./post.service";


const initialState = {
  
  isLoading: false,
  statusMessage: "",
  posts:[],
  post:null,
  isDeleted:false,
};

export const fetchAllPostsAction = createAsyncThunk(
  "post/fetchAllPosts",
  async (thunkAPI) => {
    try {
      const response = await post.fetchAllPosts();
      return response.data.data;
    } catch (error) {
        console.log(error);
        
    }
  }
);

export const createPostAction = createAsyncThunk(
  "post/createPost",
  async ({ formData, moveToNext, notifyToaster }, thunkAPI) => {
    try {
      const response = await post.createPost(formData);
      
      if (response) {
        if (notifyToaster) {
          notifyToaster('Post Created Successfully.', "success");
        }
        console.log('response',response);
        if (moveToNext) {
          moveToNext();
        }
      } 
      return response.data;
    } catch (error) {
      notifyToaster('Something went wrong.', "error");
    }
  }
);

export const updatePostAction = createAsyncThunk(
  "post/updatePost",
  async ({ id, formData, moveToNext, notifyToaster }, thunkAPI) => {
    try {
      const response = await post.updatePost(id, formData);
      
      if (response) {
        if (notifyToaster) {
          notifyToaster('Post Updated Successfully.', "success");
        }
        console.log('response',response);
        if (moveToNext) {
          moveToNext();
        }
      } 
      return response.data;
    } catch (error) {
      notifyToaster('Something went wrong.', "error");
    }
  }
);

export const deletePostAction = createAsyncThunk(
  "post/deletePost",
  async ({ id , notifyToaster}, thunkAPI) => {
    try {
      const response = await post.deletePost(id);
      
      if (response) {

        if (notifyToaster) {
          notifyToaster('Post Deleted Successfully.', "success");
        }
      } 
      return response.data;
    } catch (error) {
      console.log(error);
      notifyToaster('Something Went wrong in server.', "error");
    }
  }
);


export const fetchPostAction = createAsyncThunk(
  "post/fetchPost",
  async ({ id }, thunkAPI) => {
    try {
      const response = await post.fetchPost(id);
      
      if (response) {
        console.log('response',response);
      } else {
        // notifyToaster(response.message, "error");
      }
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);




export const postSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearData: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.statusMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllPostsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPostsAction.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createPostAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPostAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post= action.payload;
      })
      .addCase(createPostAction.rejected, (state, action) => {
        state.isLoading = false;
        state.statusMessage = action.payload;
      })
      .addCase(updatePostAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePostAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post= action.payload;
      })
      .addCase(updatePostAction.rejected, (state, action) => {
        state.isLoading = false;
        state.statusMessage = action.payload;
      })
      .addCase(deletePostAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePostAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted= true;
      })
      .addCase(deletePostAction.rejected, (state, action) => {
        state.isLoading = false;
        state.statusMessage = action.payload;
      })
      .addCase(fetchPostAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPostAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post= action.payload;
      })
      .addCase(fetchPostAction.rejected, (state, action) => {
        state.isLoading = false;
        state.statusMessage = action.payload;
      })
    },
});

export const { clearData } = postSlice.actions;

export default postSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "./auth.service";


const initialState = {
  logedInUSer: null,
  createAccount: null,
  userSubscriptionData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  statusMessage: "",
  profileData:[]
};

export const signInAction = createAsyncThunk(
  "auth/signInApi",
  async ({ formData, moveToNext, notifyToaster }, thunkAPI) => {
    try {
      const response = await auth.signInApi(formData);

      console.log('my response', response);
      
      
      if (response.status === 200) {
        if (notifyToaster) {
          notifyToaster('Login Successfully.', "success");
        }
          localStorage.setItem("logedIn_user", JSON.stringify(response.data?.data?.user));
          localStorage.setItem("jwt_token", JSON.stringify(response.data?.data?.token));
        
        if (moveToNext) {
          moveToNext();
        }
      } else {
        console.log('response',response);
        notifyToaster(response.message, "error");
      }
      return response.data;
    } catch (error) {
      notifyToaster(error?.response?.data?.message, "error");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signUpAction = createAsyncThunk(
  "auth/signUpApi",
  async ({ formData, moveToNext, notifyToaster }, thunkAPI) => {
    try {
      const response = await auth.signUpApi(formData);
      console.log('response',response);
      if (response) {
        
        if (notifyToaster) {
          notifyToaster("User Registered Successfully.", "success");
        }
        if (moveToNext) {
          moveToNext();
        }
      } else {
        notifyToaster(response.message, "error");
      }
      return response.data;
    } catch (error) {
      console.log('response',error.response.data.message);
      notifyToaster(error.response.data.message, "error");
    }
  }
);

export const authSlice = createSlice({
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
      .addCase(signInAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.logedInUSer = action.payload;
      })
      .addCase(signInAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusMessage = action.payload;
      })
      .addCase(signUpAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

      })
      .addCase(signUpAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.statusMessage = action.payload;
      })
   
    },
});

export const { clearData } = authSlice.actions;

export default authSlice.reducer;

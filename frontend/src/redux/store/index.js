import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import postReducer from "../features/post/post.slice";

// import userReducer from '../feature/user/user.slice.js';
// import shipmentReducer from '../feature/shipment/shipment.slice.js';
// import systemSlice from "../feature/system/system.slice.js";
// import dashboardSlice from "../feature/dashboard/dashboard.slice.js";
// import noticeSlice from "../feature/notice/notice.slice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer
    // user: userReducer,
    // shipment: shipmentReducer,
    // system: systemSlice,
    // dashboard: dashboardSlice,
    // notice: noticeSlice
  },

});

export default store;

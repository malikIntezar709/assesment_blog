import api from "../../../utils/api";

const signInApi = async (userAccount) => {
  
  const response = await api.post(`/login`, userAccount);
  return response;
};


const signUpApi = async (user) => {
  const response = await api.post(`/register`, user);
  return response;
};



const getUserInfo = async (user) => {
  const response = await api.get(`/get/user/profile/${user?.id}`);
  return response;
};



const auth = {
  signInApi,
  signUpApi,
  getUserInfo,
};

export default auth;

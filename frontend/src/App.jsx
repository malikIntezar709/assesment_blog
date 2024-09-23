import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import SignUp from './components/SignUp'
import Login from './components/Login'
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import PostDetail from './components/PostDetail';

function App() {
  
  const logedInUser=JSON.parse(localStorage.getItem("logedIn_user"));
console.log('logedInUser',logedInUser);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/post/view" element={<PostDetail />} />
          {
            logedInUser?.role === 'admin'  && <Route path="/create/post" element={<CreatePost />} />
          }


        </Routes>
      </Router>
    </>
  )
}

export default App

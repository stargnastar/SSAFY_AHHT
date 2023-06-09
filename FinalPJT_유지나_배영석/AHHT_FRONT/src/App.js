// import "./App.css";
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from './components/main/Main';
import Company from './components/company/Company';
import About from './components/company/About';
import History from './components/company/History';
import Doctor from './components/expert/Doctor';
import Trainer from './components/expert/Trainer';
import Gather from './components/gather/Gather';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import Map from './components/map/Map';
import Video from './components/video/Video';
import Mypage from './components/login/Mypage';
import Follow from './components/login/follow';
import DietForm from './components/gather/DietForm';
// import WorkoutForm from "./components/gather/WorkoutForm";
import TodoList from './components/gather/TodoList';
import Chatbot from './components/commons/chatbot/Chatbot';
import PostDetail from './components/gather/PostDetailTab';

function App({ youtube }) {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/company" element={<Company />}></Route>
        <Route path="/company/about" element={<About />} />
        <Route path="/company/history" element={<History />} />
        <Route path="/expert/doctor" element={<Doctor />} />
        <Route path="/expert/trainer" element={<Trainer />} />
        <Route path="/gather" element={<Gather />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/map" element={<Map />} />
        <Route path="/video" element={<Video youtube={youtube} />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/dietform" element={<DietForm />} />
        {/* <Route path="/workoutform" element={<WorkoutForm />} /> */}
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </div>
  );
}

export default App;

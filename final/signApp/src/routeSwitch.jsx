import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import React from "react";
import Homepage from "./pages/Homepage/homepage";
import Navbar from "./components/navbar";
import Register from "./pages/Register/register";
import Dashboard from "./pages/DashBoard/Dashboard";
import Lesson from "./pages/Lesson/Lesson";
import Quiz from "./pages/Quiz/Quiz";
import Profile from "./pages/profile/profile";
import Leaderboard from "./pages/Leaderboard/Leaderboard";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lessons" element={<Lesson />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;

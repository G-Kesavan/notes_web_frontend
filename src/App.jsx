import React from "react";
import HomePage from "./Pages/Home/HomePage";
import LoginPage from "./Pages/Login/LoginPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
);

const App = () => {
  return <div className="bg-blue-50 min-h-[100vh] max-h-[auto]">{routes}</div>;
};

export default App;

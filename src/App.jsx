import React from "react";
import Landing from "./pages/Home/Landing";
import Auth from "./pages/Auth/Auth";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/SignUp";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;

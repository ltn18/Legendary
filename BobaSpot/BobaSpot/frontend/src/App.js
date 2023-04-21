import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import AuthRoute from "./services/AuthRoute";
import LandingRoute from "./services/LandingRoute";

import axios from 'axios'

import Landing from "./TmpLanding";

import NavBar from './components/layout/NavBar';
import UserProfile from './contents/profile/user/customer/UserProfile';
import ShopOwnerProfile from './contents/profile/user/shopowner/ShopOwnerProfile';

import Temp from "./temp";
import Login from "../src/contents/auth/Login/Login"
import Signup from "../src/contents/auth/Signup/Signup"
// import ShopProfile from './components/ShopProfile/ShopProfile';

// verify yourself, copilot

const App = () => {
  const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("token") !== null);

  useEffect(() => {
    const user = sessionStorage.getItem("token");
    console.log("user:", user);
    if (user) {
      setAuthenticated(user);
      // navigate("/", { replace: true });
    }

  }, [authenticated])

  // <Temp />

  // use protected route
  return (
    <Router>
      {
        authenticated
          ? <NavBar />
          : <></>
      }

      <Routes>

        {/* absolute path */}
        <Route path="/" element={
          authenticated ? <Landing /> : <Login />
        } />
        <Route path="*" element={<LandingRoute authenticated={authenticated} />} />

        {/* authentication */}
        <Route path="login" element={
          <AuthRoute authenticated={!authenticated}>
            <Login />
          </AuthRoute>
        } />

        <Route path="signup" element={
          <AuthRoute authenticated={!authenticated}>
            <Signup />
          </AuthRoute>
        } />

        {/* in app */}
        <Route path="home" element={<Landing />} />
        <Route path="user" element={<UserProfile />} />
        <Route path="shopowner" element={<ShopOwnerProfile />} />

      </Routes>
    </Router>
  )

}

export default App;
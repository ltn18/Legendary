import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Navbar from './contents/landing/Navbar';

// import './App.css'

import axios from 'axios'

import ShopProfile from './components/ShopProfile/ShopProfile';
import Home from "./contents/landing/Home"

import AuthRoute from "./services/AuthRoute";
import LandingRoute from "./services/LandingRoute";
import PermissionRoute from "./services/PermissionRoute";

import Landing from "./TmpLanding";

import NavBar from './components/layout/NavBar';
import UserProfile from './contents/profile/user/customer/UserProfile';
import ShopOwnerProfile from './contents/profile/user/shopowner/ShopOwnerProfile';

import Temp from "./temp";
import Login from "../src/contents/auth/Login/Login"
import Signup from "../src/contents/auth/Signup/Signup"

// verify yourself, copilot

const App = () => {
  const [authenticated, setAuthenticated] = useState(sessionStorage.getItem("token") !== null);

  // sesionStorage.getItem("isShopOwner")
  const [isShopOwner, setIsShopOwner] = useState();

  useEffect(() => {
    const user = sessionStorage.getItem("token");
    const owner = sessionStorage.getItem("isShopOwner");
    console.log("user:", user);
    console.log("owner:", owner);

    if (user) {
      setAuthenticated(user);
      setIsShopOwner(owner);
      // set isShopOwner here
    }

  }, [authenticated, isShopOwner])

  // <Temp />

  // use protected route
  return (
    <Router
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      {
        authenticated
          ? <NavBar />
          : <></>
      }

      <Routes>

        {/* absolute path */}
        <Route path="/" element={
          authenticated ? <Home /> : <Login />
        } />

        <Route path="*" element={
          authenticated ? <LandingRoute /> : <Navigate to="/login" replace />
        } />

        {/* authentication */}
        <Route path="login" element={
          !authenticated ? <Login /> : <Navigate to="/home" replace />
        } />

        <Route path="signup" element={
          !authenticated ? <Signup /> : <Navigate to="/home" replace />
        } />

        {/* in app */}
        <Route path="home" element={
          <AuthRoute authenticated={authenticated}>
            <Home />
          </AuthRoute>
        } />

        <Route path="user" element={
          <AuthRoute authenticated={authenticated}>
            <PermissionRoute isShopOwner={isShopOwner} />
            {/* <ShopOwnerProfile /> */}
            {/* <UserProfile /> */}
          </AuthRoute>
        } />

        <Route path="bobashop/:boba_id" element={<ShopProfile />} />

      </Routes>
    </Router>
  )

}

export default App;
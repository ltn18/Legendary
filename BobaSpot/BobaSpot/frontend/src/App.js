import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';

import './App.css'

import axios from 'axios'

import ShopProfile from './components/ShopProfile/ShopProfile';
import Home from "./contents/landing/Home"

import AuthRoute from "./services/AuthRoute";
import LandingRoute from "./services/LandingRoute";
import PermissionRoute from "./services/PermissionRoute";
import IsCustomerRoute from "./services/IsCustomerRoute";
import IsShopOwnerRoute from "./services/IsShopOwnerRoute"

import Landing from "./TmpLanding";

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

  const handleConvertToken = (tk) => {
    console.log(tk);
    console.log("true str:", tk === 'true');
    console.log("true bool:", tk === true);
    console.log("false str:", tk === 'false');
    console.log("false bool:", tk === false);
    return tk === 'true';
  }

  useEffect(() => {
    const user = sessionStorage.getItem("token");
    const owner = handleConvertToken(sessionStorage.getItem("isShopOwner"));

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

        <Route path="customer" element={
          <IsCustomerRoute authenticated={authenticated} isCustomer={!isShopOwner}>
            <UserProfile />
          </IsCustomerRoute>
        } />

        <Route path="shopowner" element={
          <IsShopOwnerRoute authenticated={authenticated} isShopOwner={isShopOwner}>
            <ShopOwnerProfile />
          </IsShopOwnerRoute>
        } />

        <Route path="user" element={
          <PermissionRoute authenticated={authenticated} isShopOwner={isShopOwner} />
        } />

        <Route path="bobashop/:boba_id" element={<ShopProfile />} />

      </Routes>
    </Router>
  )

}

export default App;
<<<<<<< HEAD
import React from "react";
import { 
=======
import './App.css';
import ShopProfile from './components/ShopProfile/ShopProfile';
import Home from "./contents/landing/Home"
import Login from "./contents/auth/Login/Login"
import Signup from "./contents/auth/Signup/Signup"

import {
>>>>>>> main
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
<<<<<<< HEAD
// import NavBar from './components/layout/NavBar';
import Temp from "./temp";
import Login from "../src/contents/auth/Login/Login"
import Signup from "../src/contents/auth/Signup/Signup"
import NavBar from './components/NavBar/NavBar';
import ShopProfile from './components/ShopProfile/ShopProfile';
// import UserProfile from './contents/profile/user/customer/UserProfile';
// import ShopOwnerProfile from './contents/profile/user/shopowner/ShopOwnerProfile';

// verify yourself, copilot

const App = () => {
  return (
    // <Temp/>
    <Router>
          <Routes>
              <Route exact path='/temp' element={<Temp />} />
              <Route exact path="/login" element={<Login />} /> 
              <Route exact path="/signup" element={<Signup />} /> 
        </Routes>   
=======
import Navbar from './contents/landing/Navbar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/bobashop/:boba_id/' element={
          <>
            <Navbar />
            <ShopProfile />
          </>
        } />
        {/* <Route exact path='/temp' element={<Temp />} /> */}
        <Route exact path="/login" element={<Login />} /> 
        <Route exact path="/signup" element={<Signup />} /> 
      </Routes>
>>>>>>> main
    </Router>
  );
}

export default App;
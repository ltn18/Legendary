import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import NavBar from './components/layout/NavBar';
import UserProfile from './contents/profile/user/customer/UserProfile';
import ShopOwnerProfile from './contents/profile/user/shopowner/ShopOwnerProfile';

import Temp from "./temp";
import Login from "../src/contents/auth/Login/Login"
import Signup from "../src/contents/auth/Signup/Signup"
import ShopProfile from './components/ShopProfile/ShopProfile';

// verify yourself, copilot

const App = () => {
  return (
    // <Temp />
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/temp' element={<Temp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path='/user' element={<UserProfile />} />
        <Route exact path='/shopowner' element={<ShopOwnerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
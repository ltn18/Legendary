import React from "react";
<<<<<<< HEAD
import {
 BrowserRouter as Router,
 Routes,
 Route
} from "react-router-dom";
import Login from "../src/contents/auth/Login/Login"
import Signup from "../src/contents/auth/Signup/Signup"
import Temp from "./temp";
=======
import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
// import NavBar from './components/layout/NavBar';
import Temp from "./temp";
import Login from "../src/contents/auth/Login/Login"
import Signup from "../src/contents/auth/Signup/Signup"
import NavBar from './components/NavBar/NavBar';
import ShopProfile from './components/ShopProfile/ShopProfile';
// import UserProfile from './contents/profile/user/customer/UserProfile';
// import ShopOwnerProfile from './contents/profile/user/shopowner/ShopOwnerProfile';
>>>>>>> e046a58fcc0f19c21038b651cbf6ebea2de274b4

// verify yourself, copilot

const App = () => {
  return (
<<<<<<< HEAD
    <Temp/>
    // <Router>
    //       <Routes>
            
    //           <Route exact path="/login" element={<Login />} /> 
    //           <Route exact path="/signup" element={<Signup />} /> 
    //     </Routes>   
    // </Router>
=======
    // <Temp/>
    <Router>
          <Routes>
              <Route exact path='/temp' element={<Temp />} />
              <Route exact path="/login" element={<Login />} /> 
              <Route exact path="/signup" element={<Signup />} /> 
        </Routes>   
    </Router>
>>>>>>> e046a58fcc0f19c21038b651cbf6ebea2de274b4
  );
}

export default App;
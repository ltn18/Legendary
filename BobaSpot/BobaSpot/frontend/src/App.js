import React from "react";
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

// verify yourself, copilot

const App = () => {
  return (
    <Temp/>
    // <Router>
    //       <Routes>
            
    //           <Route exact path="/login" element={<Login />} /> 
    //           <Route exact path="/signup" element={<Signup />} /> 
    //     </Routes>   
    // </Router>
  );
}

export default App;
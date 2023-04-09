import React from "react";
import {
 BrowserRouter as Router,
 Routes,
 Route
} from "react-router-dom";
import Login from "../src/contents/auth/Login/Login"
import Signup from "../src/contents/auth/Signup/Signup"
import Temp from "./temp";

function App() {
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

import './App.css';
import ShopProfile from './components/ShopProfile/ShopProfile';
import Home from "./contents/landing/Home"
import Login from "./contents/auth/Login/Login"
import Signup from "./contents/auth/Signup/Signup"

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
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
    </Router>
  );
}

export default App;
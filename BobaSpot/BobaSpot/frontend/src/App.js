import './App.css';
import ShopProfile from './components/ShopProfile/ShopProfile';
import Home from "./contents/landing/Home"
import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/bobashop/' element={<ShopProfile/>}/>
        {/* <Route exact path='/temp' element={<Temp />} />
        <Route exact path="/login" element={<Login />} /> 
        <Route exact path="/signup" element={<Signup />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
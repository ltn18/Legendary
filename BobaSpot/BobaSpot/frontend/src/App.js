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
        <Route exact path='/bobashop/fdc4875e-c552-486e-b6c3-a4e0d715eaed/' element={<ShopProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
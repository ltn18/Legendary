import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import NavBar from './components/layout/NavBar';
import UserProfile from './contents/profile/user/customer/UserProfile';
import ShopOwnerProfile from './contents/profile/user/shopowner/ShopOwnerProfile';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/user' element={<UserProfile/>}/>
        <Route exact path='/shopowner' element={<ShopOwnerProfile />}/>
      </Routes>
    </Router>
  );
}

export default App;

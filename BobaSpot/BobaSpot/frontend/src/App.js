import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
// import NavBar from './components/layout/NavBar';
import NavBar from './components/NavBar/NavBar';
import ShopProfile from './components/ShopProfile/ShopProfile';
// import UserProfile from './contents/profile/user/customer/UserProfile';
// import ShopOwnerProfile from './contents/profile/user/shopowner/ShopOwnerProfile';

// verify yourself, copilot

const App = () => {
  return (
    <Router>
      <NavBar />
      <ShopProfile/>
      {/* <Routes>
        <Route exact path='/user' element={<UserProfile/>}/>
        <Route exact path='/shopowner' element={<ShopOwnerProfile />}/>
      </Routes> */}
    </Router>
  );
}

export default App;
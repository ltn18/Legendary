import React from 'react'
import { Button,
    Tooltip
} from 'antd';
import {Link, useNavigate } from "react-router-dom";
import { UserOutlined,
         LogoutOutlined } from '@ant-design/icons';

const Navbar = () => {
  const navigate = useNavigate();
    const navigateLogin = () => {
      sessionStorage.removeItem("token");
        sessionStorage.removeItem("isShopOwner");
      let path = '/login'; 
      navigate(path, { replace: true });
      window.location.reload(true);
      
  }
    
  const navigateUser = () => {
      navigate('/user', { replace: true });
      window.location.reload(true);
  };
  return (
    <nav>
        <a>
        <Tooltip title="User Profile">
            <Button onClick={(navigateUser)} type="text" className='nav-user_profile'>
                <UserOutlined onClick={navigateUser} className='nav-button-icon'/>
            </Button>
        </Tooltip>
        </a>
        <a>
        <Tooltip title="Log-out">
                  <Button onClick={(navigateLogin)} type="text" className='nav-logout'>
                      <LogoutOutlined onClick={navigateLogin} className='nav-button-icon'/>
            </Button>
        </Tooltip>
        </a>
        <a href="">
            <h1 className='nav-home_title'>
                BobaSpot
            </h1>
        </a>
    </nav>
  )
}

export default Navbar;
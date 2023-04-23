import React from 'react'
import { Button,
         Tooltip } from 'antd';
import { UserOutlined,
         LogoutOutlined } from '@ant-design/icons';

const Navbar = () => {
  return (
    <nav>
        <a href="">
        <Tooltip title="User Profile">
            <Button type="text" className='nav-user_profile'>
                <UserOutlined className='nav-button-icon'/>
            </Button>
        </Tooltip>
        </a>
        <a href="">
        <Tooltip title="Log-out">
            <Button type="text" className='nav-logout'>
                <LogoutOutlined className='nav-button-icon'/>
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
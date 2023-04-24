import React from 'react';

// components
import { Link } from 'react-router-dom'

import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import "./NavBar.css";

const NavBar = () => {
    return (
        <div style={{
            width: '100%',
            height: '80px',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div className="links">
                <Link to="/" style={{ color: 'black' }}>BobaSpot</Link>
            </div>
            <div className="links">
                <Link to="/user"><UserOutlined /></Link>
                <Link to="/login"><LogoutOutlined /></Link>
            </div>
        </div >
    )
}

export default NavBar;
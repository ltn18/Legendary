import React from 'react';

// components
import { Link, useNavigate } from 'react-router-dom'

import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import "./NavBar.css";

const NavBar = () => {
    const navigate = useNavigate();


    // why cannot logout here?
    const handleLogout = () => {
        sessionStorage.setItem("token", null);
        localStorage.setItem("authenticated", false);

        console.log("OKOK");    

        console.log("token: " + sessionStorage.getItem("token"));
        console.log("authenticated: " + localStorage.getItem("authenticated"));

        navigate('/login', { replace: true })
        window.location.reload(true);
    }

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
                <LogoutOutlined onClick={handleLogout} />
            </div>
        </div >
    )
}

export default NavBar;
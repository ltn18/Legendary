import React from 'react'
import Navbar from "./Navbar"
import About from "./About"
import Map from "./Map"
import BannerBgr from "./Assets/landing_banner.png";
import { DownCircleOutlined } from '@ant-design/icons';
import './Home.css';

const Home = () => {
  return (
    <div>
        <Navbar />
        <img src={BannerBgr} className='home-banner-image' alt="banner image here" img/>
        <DownCircleOutlined className='home-scroll-down'/>
        <Map />
        <About />
    </div>
  );
}

export default Home;
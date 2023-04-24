import React from 'react'
import About from "./About"
import Map from "./Map"
import BannerBgr from "./Assets/landing_banner.png";
import { DownCircleOutlined } from '@ant-design/icons';

const Home = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%'
    }}>
      <div
        style={{
          width: '100%',
          height: '70%'
        }}
      >
        <img
          src={BannerBgr}
          className='home-banner-image'
          alt="banner image here"
          img
        />
        <DownCircleOutlined className='home-scroll-down' style={{ marginBottom: 20 }} />
      </div>

      <div
        style={{
          width: '100%',
          height: '30%',
        }}
      >
        <Map />
        <hr style={{ height: 20 }} />
        <About />
      </div>
    </div>
  );
}

export default Home;
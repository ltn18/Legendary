import React from 'react'
import { Link } from 'react-router-dom'
import { GithubOutlined, LinkedinOutlined, FacebookOutlined } from '@ant-design/icons';
import logo from "./Assets/BobaSpot.png"
import { Col } from 'antd';

const About = () => {
  return (
    <Col offset={2} span={20}>
      <div className="footer-wrapper">
        <div className="footer-section-one">
          <img src={logo} alt="logo here" />
          <div className="footer-icons"
            style={{
              marginTop: '0.5rem',
              marginLeft: '1rem',
              cursor: 'pointer'
            }}
          >
            <a href="https://github.com/ltn18/Legendary" target="_blank">
              <GithubOutlined />
            </a>
            {/* <LinkedinOutlined />
            <FacebookOutlined /> */}
          </div>
        </div>
        <div className="footer-section-two">
          <div className="footer-section-columns">
            <span><b>Tel:</b> 216-420-0326</span>
            <span><b>Team Name:</b> Legendary</span>
            <span><b>Course:</b> Software Engineering</span>
            <span><b>University:</b> Case Western Reserve University</span>
          </div>
        </div>
      </div>
    </Col >
  );
}

export default About
import React from 'react'
import { GithubOutlined, LinkedinOutlined, FacebookOutlined} from '@ant-design/icons';
import logo from "./Assets/BobaSpot.png"
import { Col } from 'antd';

const About = () => {
  return (
    <Col offset={2} span={20}>
      <div className="footer-wrapper">
        <div className="footer-section-one">
              <img src={logo} alt="logo here" />
          <div className="footer-icons">
            <GithubOutlined />
            <LinkedinOutlined />
            <FacebookOutlined />
          </div>
        </div>
        <div className="footer-section-two">
          <div className="footer-section-columns">
            <span>123-456-7890</span>
            <span>Legendary</span>
            <span>CSDS 393</span>
            <span>CWRU</span>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default About
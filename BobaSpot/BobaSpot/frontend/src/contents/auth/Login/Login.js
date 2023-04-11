import { Button, Form, Input,Typography } from 'antd';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import {Link} from "react-router-dom";
import "../login-signup.css";
import axios from 'axios';


const { Title } = Typography;

const initialFormState = {
  firstname: '',
  lastname: '',
  username: '',
  password: ''
}

function Login() { 
  const minLevel = 0.1;
  const errorMessage = 'Password is too weak';
  const [level,setLevel]=useState(0)
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initialFormState);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const checkPasswordStrength = (rule, value, callback) => {
    if (value && value.length >= 8) {
      let strength = 0;
      if (value.match(/[a-z]/)) {
        strength += 1;
      }
      if (value.match(/[A-Z]/)) {
        strength += 1;
      }
      if (value.match(/[0-9]/)) {
        strength += 1;
      }
      if (value.match(/[^a-zA-Z0-9]/)) {
        strength += 1;
      }

      if (strength === 0) {
        callback('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character!');
      } else if (strength === 1) {
        setPasswordStrength('Weak');
        callback();
      } else if (strength === 2) {
        setPasswordStrength('Medium');
        callback();
      } else if (strength === 3) {
        setPasswordStrength('Strong');
        callback();
      } else {
        setPasswordStrength('Very Strong');
        callback();
      }
    } else {
      callback('Password must be at least 8 characters long!');
    }
  };

  const onFinish = () => {
    console.log('Received values of form:', form);
<<<<<<< HEAD
    axios.post('http://localhost:8000/login', {
    username: 'aa',
    password: 'a'
    })
    .then(function (response) {
      console.log(response);
=======
    axios.post('http://localhost:8000/api/login/', {
    username: form.username,
    password: form.password
    })
    .then(function (response) {
      console.log(JSON.parse(response.data).token);
      sessionStorage.setItem("token", JSON.parse(response.data).token);
      
>>>>>>> e046a58fcc0f19c21038b651cbf6ebea2de274b4
    })
    .catch(function (error) {
      console.log(error);
    });
    /**
     * MANUAL VALIDATOR
     * Signup -> check fields (length, strength)
     * - if username < 6 char 
     * - if password < 10 char
     * submit the data to backend
     * backend will send back token if the user is valid
     */
  };
<<<<<<< HEAD
=======
  
>>>>>>> e046a58fcc0f19c21038b651cbf6ebea2de274b4

  const toggleAuth = () => { 
    setIsLogin(!isLogin);
  }
  return (
    <>
      <Row className='Full-page'>
        {/* left column */}
        <Col className='Column' span={12} style={{}}>
          <img style={{ width: '100%', height: '100%' }} src={"https://cdn.dribbble.com/userupload/3841872/file/original-0a6f56e82ee816c6b6ab202747a58307.png?compress=1&resize=1024x768"} />
        </Col>
        {/* right column */}
        <Col className='Column' span={12}>
          <Form
            name="login-signup"
            className="login-form"
            onFinish={onFinish}
          >
            <Title level={1} className="logo-text">
              Boba<br />Spot
            </Title>
            {/* firstname and lastname */}
            {!isLogin &&
              <>
              {/* firstname */}
                <Form.Item
                  name="firstname"
                  className='form-field'
                  validateStatus={String.validateStatus}
                  help={String.errorMsg}
                  rules={[
                    {
                      required: true,
                      message: 'Please inpur your First name!',
                    },
                  ]}
                >
                  <Input
                    placeholder="First name"
                    onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                  />
                  
                </Form.Item>
                {/* lastname */}
                <Form.Item
                  name="lastname"
                  className='form-field'
                  validateStatus={String.validateStatus}
                  help={String.errorMsg}
                  rules={[
                    {
                      required: true,
                      message: 'Please inpur your Last name!',
                    },
                  ]}
                >
                  <Input
<<<<<<< HEAD
=======
                    
>>>>>>> e046a58fcc0f19c21038b651cbf6ebea2de274b4
                    placeholder="Last name"
                    onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                  />
                  
                </Form.Item>
              </>
            }
            {/* username */}
            <Form.Item
              name="username"
              className='form-field'
              validateStatus={String.validateStatus}
              help={String.errorMsg}
              rules={isLogin ? null : [
                {
                  required: true,
                  message: 'Please input your Username!',
                },
                {
                  min: 6, 
                  message: 'Username must be minimum 6 characters',
                },
                {
                  max:20, 
                  message:'Username name must be less than 20 characters'
                }
              ]}
            >
            
              <Input
<<<<<<< HEAD
=======
                
>>>>>>> e046a58fcc0f19c21038b651cbf6ebea2de274b4
                placeholder="Username"
                onChange={(e) => setForm({ ...form, username: e.target.value})}
                style={{borderRadius: '0px'}}
              />
            </Form.Item>
            {/* password */}
            <Form.Item
<<<<<<< HEAD
=======
              
>>>>>>> e046a58fcc0f19c21038b651cbf6ebea2de274b4
              name="password"
              rules={isLogin ? null : [
                {
                  required: true,
                  message: 'Please input your Password!',
                },
                {
                  validator: checkPasswordStrength,
                }
              ]
              }
              extra={passwordStrength && `Password Strength: ${passwordStrength}`}
            >
              <Input
<<<<<<< HEAD
=======
                
>>>>>>> e046a58fcc0f19c21038b651cbf6ebea2de274b4
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onLevelChange={ setLevel}
                style={{borderRadius: '0px'}}
              />
            </Form.Item>
            <Form.Item>
<<<<<<< HEAD
              <Button htmlType="submit" className="login-signup-button">{'Log In'}</Button> 
=======
              <Button  htmlType="submit" className="login-signup-button">{'Log In'}</Button> 
>>>>>>> e046a58fcc0f19c21038b651cbf6ebea2de274b4
              <Link to='/signup'>
                         Don't have an account? Signup!
              </Link>
            </Form.Item>

          </Form>
          
        </Col>

      </Row>
    </>
  );
}
export default Login;

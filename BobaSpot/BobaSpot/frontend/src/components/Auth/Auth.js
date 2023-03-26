import { Button, Form, Input,Typography } from 'antd';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import "./Auth.css";


const { Title } = Typography;
const initialFormState = {
  firstname: '',
  lastname: '',
  username: '',
  password: ''
}

function Auth() { 
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState(initialFormState);

  const onFinish = (values) => {
    console.log('Received values of form:', values);
    // need to mock api

  };

  const toggleAuth = () => { 
    setIsLogin(!isLogin);
  }
  return (
    <>
      <Row className='Full-page'>
        <Col className='Column' span={12} style={{}}>
          <img style={{ width: '100%', height: '100%' }} src={"https://cdn.dribbble.com/userupload/3841872/file/original-0a6f56e82ee816c6b6ab202747a58307.png?compress=1&resize=1024x768"} />
        </Col>
        <Col className='Column' span={12}>
          <Form
            name="login-signup"
            className="login-form"
            onFinish={onFinish}
          >
            <Title className="logo-text">
              Boba<br />Spot
            </Title>
            {!isLogin &&
              <>
                <Form.Item
                  name="firstname"
                  className='form-field'
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
                <Form.Item
                  name="lastname"
                  className='form-field'
                  rules={[
                    {
                      required: true,
                      message: 'Please inpur your Last name!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Last name"
                    onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                  />
                  
                </Form.Item>
              </>
            }
            <Form.Item
              name="username"
              className='form-field'
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input
                placeholder="Username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                style={{borderRadius: '0px'}}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={{borderRadius: '0px'}}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-signup-button">{isLogin ? 'Log-in' : 'Sign Up'}</Button>
              <Typography className='auth-toggle' onClick={toggleAuth}><u>{isLogin ? "Don't have an account? Signup!" : 'Already had an account? Log in'}</u></Typography>
            </Form.Item>

          </Form>
          
        </Col>

      </Row>
    </>
  );
}
export default Auth;
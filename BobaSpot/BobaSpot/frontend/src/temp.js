import { Button, Form, Input,Typography } from 'antd';
import React, { useState } from 'react';

const { Title } = Typography;

const initialState = {
  input: ''
}
function Temp() { 
  const [username, setUserName] = useState(initialState);

  const onFinish = () => {
    console.log('Received values of form:', username);
  };
    
  const saveData = () => {
    //saving username to session storage
    sessionStorage.setItem("input", username);
 
    // setIsSaved(true);
    // setTimeout(() => {
    //   setIsSaved(false);
    // }, 2000);
  };
  const printSessionData = () => {
    //fetching username from sesstion storage
      
      console.log(sessionStorage.getItem("token"));
      console.log(sessionStorage.getItem("isShopOwner"));
      
  };
  const clearSessionData = () => {
    //Removing username from sesstion storage
    sessionStorage.removeItem("input");
 
    // setIsCleared(true);
    // setTimeout(() => {
    //   setIsCleared(false);
    // }, 2000);
  };

  return (
    <>
          <Form
            name="login-signup"
            className="login-form"
            onFinish={onFinish}
          >
              
              {/* firstname */}
                <Form.Item
                  name="input"
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
                      value={username}
                      placeholder="Input"
                      onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Item>
                


                <Form.Item>
                    <Button onClick={saveData}>{'save'}</Button> 
                </Form.Item>
                <Form.Item>
                    <Button onClick={printSessionData}>{'get'}</Button> 
                </Form.Item>
                <Form.Item>
                    <Button onClick={clearSessionData}>{'clear'}</Button> 
                </Form.Item>
              
          </Form>
    </>
  );
}
export default Temp;

import { Button, Form, Input, Typography, Checkbox } from 'antd';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
// firebase
import { storage, config } from "../../../services/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


import "../login-signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const { Title } = Typography;

const initialFormState = {
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  image_url: '',
  shopowner: false
}

function Signup() {
  const minLevel = 0.1;
  const errorMessage = 'Password is too weak';
  const [level, setLevel] = useState(0)
  const [isLogin, setIsLogin] = useState(true);
  const [form_signup, setForm] = useState(initialFormState);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/temp`;
    navigate(path);
  }
  // upload single image
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [createUserImages, setCreateUserImages] = useState([]);
  const [isHoverSubmitImage, setIsHoverSubmitImage] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // handle file upload
  const [uploadedFile, setUploadedFile] = useState();
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

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


  const handleUploadSingleImage = () => {
    const user_id = form_signup.id;

    const file = uploadedFile;
    console.log("uploadedFile:", uploadedFile);

    if (!file) return;

    const storageRef = ref(storage, `user_profile_image/${user_id}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('downloadUrl', downloadURL);
          setImgUrl(downloadURL);
          // let tmpUserImages = createUserImages;
          // tmpUserImages.push(downloadURL);
          // setCreateUserImages(tmpUserImages);
          setUploadedFileUrl(downloadURL);
        });
      }
    );
  }


  const handleHoverSubmitImageEnter = () => {
    setIsHoverSubmitImage(true);
  }

  const handleHoverSubmitImageLeave = () => {
    setIsHoverSubmitImage(false);
  }

  const onFinish = () => {
    console.log('Received values of form:', form_signup);
    axios.put(process.env.REACT_APP_AXIOS_BASE_URL + '/api/login/', {
      username: form_signup.username,
      password: form_signup.password,
      first_name: form_signup.firstname,
      last_name: form_signup.lastname,
      shopowner: form_signup.shopowner,
      image_url: uploadedFileUrl
    })
      .then(function (response) {
        console.log(JSON.parse(response.data).token);
        console.log(JSON.parse(response.data).isShopOwner);
        sessionStorage.setItem("token", JSON.parse(response.data).token);
        sessionStorage.setItem("isShopOwner", JSON.parse(response.data).isShopOwner);
        let path = `/temp`;
        navigate(path);
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log('Received values of form:', values);
    /**
     * MANUAL VALIDATOR
     * Signup -> check fields (length, strength)
     * - if username < 6 char 
     * - if password < 10 char
     * submit the data to backend
     * backend will send back token if the user is valid
     */
  };

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: 0,
  };

  return (
    <>
      console.log(config);
      <Row className='Full-page'>
        {/* left column */}
        <Col className='Column' span={13} style={{}}>
          <img style={{ width: '100%', height: '180%' }} src={"https://cdn.dribbble.com/userupload/3841872/file/original-0a6f56e82ee816c6b6ab202747a58307.png?compress=1&resize=1024x768"} />
        </Col>
        {/* right column */}
        <Col className='Column' span={11}>
          <Form
            name="login-signup"
            className="login-form"
            onFinish={onFinish}
          >
            <Title level={1} className="logo-text">
              Boba<br />Spot
            </Title>
            {/* firstname and lastname */}
            {
              <>
                {/* firstname */}
                <Form.Item
                  name="firstname"
                  // className='form-field'
                  validateStatus={String.validateStatus}
                  help={String.errorMsg}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your First name!',
                    },
                  ]}
                >
                  <Input
                    style={inputStyle}
                    placeholder="First name"
                    onChange={(e) => setForm({ ...form_signup, firstname: e.target.value })}
                  />

                </Form.Item>
                {/* lastname */}
                <Form.Item
                  name="lastname"
                  // className='form-field'
                  validateStatus={String.validateStatus}
                  help={String.errorMsg}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Last name!',
                    },
                  ]}
                >
                  <Input
                    style={inputStyle}
                    placeholder="Last name"
                    onChange={(e) => setForm({ ...form_signup, lastname: e.target.value })}
                  />

                </Form.Item>
              </>
            }
            {/* username */}
            {<Form.Item
              name="username"
              // className='form-field'
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
                  max: 20,
                  message: 'Username name must be less than 20 characters'
                }
              ]}
            >
              <Input
                placeholder="Username"
                onChange={(e) => setForm({ ...form_signup, username: e.target.value })}
                style={inputStyle}
              />
            </Form.Item>}
            {/* password */}
            <Form.Item
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
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form_signup, password: e.target.value })}
                onLevelChange={setLevel}
                style={inputStyle}
              />
            </Form.Item>

            <div
              style={{
                marginBottom: 10
              }}
            >
              Upload shop feature images:
            </div>
            <input
              type="file"
              onChange={(e) => { setUploadedFile(e.target.files[0]) }}
              style={{
                marginBottom: 10
              }}
              accept="image/*"
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: 10
              }}
            >
              <b>Chosen Feature Images</b>
              {
                uploadedFiles.map(file =>
                  <div>
                    {file.name}
                  </div>
                )
              }
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Button
                onMouseEnter={handleHoverSubmitImageEnter}
                onClick={handleUploadSingleImage}
                onMouseLeave={handleHoverSubmitImageLeave}
                style={{
                  marginBottom: 10
                }}
              >
                Upload Profile Image to Google Blob
              </Button>

              {
                !imgUrl &&
                <div>
                  <div style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                </div>
              }

              {/* <Button
                                    onMouseEnter={handleHoverSubmitImageEnter}
                                    onMouseLeave={handleHoverSubmitImageLeave}
                                    style={{
                                        backgroundColor: isHoverSubmitImage ? '#FDD0CF' : 'white',
                                        color: isHoverSubmitImage ? 'white' : 'black',
                                        borderColor: isHoverSubmitImage ? '#FDD0CF' : '#d7d7d7',
                                    }}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Submit
                                </Button> */}
            </div>

            {/* <img style={{ width: '100%', height: '180%' }} src={imgUrl} /> */}

            <Form.Item>
              <Checkbox onChange={(e) => setForm({ ...form_signup, shopowner: true })}>I am a shop owner</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" className="login-signup-button" ><b>{'Sign Up'}</b></Button>
              <Link to='/login'>
                Already had an account? Log in
              </Link>
            </Form.Item>




          </Form>

        </Col>

      </Row>
    </>
  );
}
export default Signup;

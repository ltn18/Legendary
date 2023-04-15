import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {
    Image, Button, Space,
    Form, Input, Select,
    TimePicker, DatePicker,
    Upload
} from 'antd';

const { Option } = Select;

// TODO1: handle submit buttons
// TODO2: see how Upload of antd works
const UserInfo = () => {
    const navigate = useNavigate();
    const [isHoverLogout, setIsHoverLogout] = useState(false);
    const [isHoverCreateShop, setIsHoverCreateShop] = useState(false)
    const [isHoverChangeInfo, setIsHoverChangeInfo] = useState(false)

    const [isHoverSubmitChangeInfo, setIsHoverSubmitChangeInfo] = useState(false)
    const [isHoverSubmitCreateShop, setIsHoverSubmitCreateShop] = useState(false)

    // how to show 1 overlay at a time
    const [showChangeInfoOverlay, setShowChangeInfoOverlay] = useState(false);
    const [showCreateShopOverlay, setShowCreateShopOverlay] = useState(false);

    // change user's info
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        image_url: ''
    });

    const options = {
        method: 'GET',
        url: 'http://localhost:8000/api/user/',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }

    const fetchUser = async () => {
        const result = await axios.request(options)
        setData(result.data);
    }

    useEffect(() => {
        console.log(`Bearer ${sessionStorage.getItem("token")}`);
        fetchUser();
    }, [data])

    const handleHoverSubmitChangeInfoEnter = () => {
        setIsHoverSubmitChangeInfo(true);
    }

    const handleHoverSubmitChangeInfoLeave = () => {
        setIsHoverSubmitChangeInfo(false);
    }

    const handleHoverSubmitCreateShopEnter = () => {
        setIsHoverSubmitCreateShop(true);
    }

    const handleHoverSubmitCreateShopLeave = () => {
        setIsHoverSubmitCreateShop(false);
    }

    const toggleChangeInfoOverlay = () => {
        setShowChangeInfoOverlay(true);
        setShowCreateShopOverlay(false)
    }

    const toggleCreateShopOverlay = () => {
        setShowCreateShopOverlay(true);
        setShowChangeInfoOverlay(false);
    }

    const handleLogoutMouseEnter = () => {
        setIsHoverLogout(true);
    };

    const handleLogoutMouseLeave = () => {
        setIsHoverLogout(false);
    };

    const handleCreateShopMouseEnter = () => {
        setIsHoverCreateShop(true);
    };

    const handleCreateShopMouseLeave = () => {
        setIsHoverCreateShop(false);
    };

    const handleChangeInfoMouseEnter = () => {
        setIsHoverChangeInfo(true);
    };

    const handleChangeInfoMouseLeave = () => {
        setIsHoverChangeInfo(false);
    };

    const handleLogout = () => {
        navigate('/login');
    }

    const handleSubmitChangeUserInfo = () => {
        const options = {
            method: 'PUT',
            url: 'http://localhost:8000/api/user/',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            data: {
                "first_name": firstName,
                "last_name": lastName,
                "password": password
            }
        };

        const updateInfo = async () => {
            const result = await axios.request(options)
                .then(res => res.data)
                .catch(err => console.log(err))
            // console.log("result: ", result);
        }

        // handle password = confirm password
        if (password === confirmPassword) {
            updateInfo();
        }
        else {
            alert("Password does not match with confirm password!")
        }
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="1">+1</Option>
                <Option value="84">+84</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                height: '25%',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                padding: 10
            }}
            >
                <div style={{ color: 'white', width: '50%' }}>
                    <Image src="https://i.ytimg.com/an/zlwQERpksnw/14720571135996419329_mq.jpg?v=6286689c" />
                </div>
                <div style={{ color: 'white', width: '50%', paddingLeft: 30 }}>
                    <h1 style={{ fontSize: 30, color: 'black' }}>{data.first_name} {data.last_name}</h1>
                    <div style={{ fontSize: 20, color: 'black' }}><i style={{}}>username:</i> {data.username}</div>
                </div>
            </div>


            <div style={{ height: '75%', background: 'white', padding: 10 }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Button
                        onMouseEnter={handleChangeInfoMouseEnter}
                        onMouseLeave={handleChangeInfoMouseLeave}
                        size='large'
                        style={{
                            borderRadius: 0,
                            backgroundColor: isHoverChangeInfo ? '#FDD0CF' : 'white',
                            color: isHoverChangeInfo ? 'white' : 'black',
                            borderColor: isHoverChangeInfo ? '#FDD0CF' : '#d7d7d7',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                        }}
                        onClick={toggleChangeInfoOverlay}
                        block
                    >
                        Change user's info
                    </Button>

                    {showChangeInfoOverlay &&
                        <Form style={{
                            marginTop: 10
                        }}>
                            <Form.Item
                                label="First name"
                                name="firstname"
                                rules={[{ message: 'Please input your first name!' }]}
                            >
                                <Input
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Last name"
                                name="lastname"
                                rules={[{ message: 'Please input your last name!' }]}
                            >
                                <Input
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Confirm Password"
                                name="confirm password"
                                rules={[{ message: 'Please input your confirm password!' }]}
                            >
                                <Input.Password
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </Form.Item>
                            <Button
                                onMouseEnter={handleHoverSubmitChangeInfoEnter}
                                onMouseLeave={handleHoverSubmitChangeInfoLeave}
                                style={{
                                    backgroundColor: isHoverSubmitChangeInfo ? '#FDD0CF' : 'white',
                                    color: isHoverSubmitChangeInfo ? 'white' : 'black',
                                    borderColor: isHoverSubmitChangeInfo ? '#FDD0CF' : '#d7d7d7',
                                }}
                                type="primary"
                                htmlType="submit"
                                onClick={handleSubmitChangeUserInfo}
                            >
                                Submit
                            </Button>
                        </Form>
                    }

                    <Button
                        onMouseEnter={handleLogoutMouseEnter}
                        onMouseLeave={handleLogoutMouseLeave}
                        size='large'
                        style={{
                            borderRadius: 0,
                            backgroundColor: isHoverLogout ? '#ff0e0e' : 'white',
                            color: isHoverLogout ? 'white' : '#ff0e0e',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            // marginTop: 30
                        }}
                        onClick={handleLogout}
                        block
                        danger
                    >
                        Logout
                    </Button>
                </Space>
            </div>
        </div>
    )
}

export default UserInfo;
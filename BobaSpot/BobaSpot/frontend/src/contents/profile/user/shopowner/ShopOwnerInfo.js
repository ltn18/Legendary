import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios'

import { storage } from "../../../../services/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {
    Image, Button, Space,
    Form, Input, Select,
    TimePicker, DatePicker,
    Upload,
    InputNumber
} from 'antd';

const { Option } = Select;

// TODO1: handle submit buttons
// TODO2: see how Upload of antd works
const ShopOwnerInfo = () => {
    const navigate = useNavigate();

    const [isHoverLogout, setIsHoverLogout] = useState(false);
    const [isHoverCreateShop, setIsHoverCreateShop] = useState(false)
    const [isHoverChangeInfo, setIsHoverChangeInfo] = useState(false)

    const [isHoverSubmitChangeInfo, setIsHoverSubmitChangeInfo] = useState(false)
    const [isHoverSubmitCreateShop, setIsHoverSubmitCreateShop] = useState(false)

    // how to show 1 overlay at a time
    const [showChangeInfoOverlay, setShowChangeInfoOverlay] = useState(false);
    const [showCreateShopOverlay, setShowCreateShopOverlay] = useState(false);

    // uploaded files
    const [uploadedFiles, setUploadedFiles] = useState([]);

    // dummy imgs
    const dummyImgLinks = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxp-pYanOg63_FoAgSlnJCLanxj6ipaz7hfA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxp-pYanOg63_FoAgSlnJCLanxj6ipaz7hfA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxp-pYanOg63_FoAgSlnJCLanxj6ipaz7hfA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxp-pYanOg63_FoAgSlnJCLanxj6ipaz7hfA&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxp-pYanOg63_FoAgSlnJCLanxj6ipaz7hfA&usqp=CAU",
    ];

    // create shop
    const [createShopName, setCreateShopName] = useState('');
    const [createShopAddress, setCreateShopAddress] = useState('');
    const [createShopHour, setCreateShopHour] = useState([]);
    const [createShopNumber, setCreateShopNumber] = useState('');
    const [createShopImages, setCreateShopImages] = useState([])

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

    useEffect(() => {
        const fetchUser = async () => {
            const result = await axios.get('http://localhost:8000/api/user/', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                }
            })
            setData(result.data);
        }

        // console.log("api_key:", process.env.REACT_APP_FIREBASE_API_KEY);

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

    const handleSubmitChangeUserInfo = async () => {
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
            console.log("result: ", result);
        }

        // handle password = confirm password
        if (password === confirmPassword) {
            updateInfo();
        }
        else {
            alert("Password does not match with confirm password!")
        }
    }

    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    const handleUploadSingleImage = (file) => {
        const unique_id = uuid();
        console.log(unique_id);

        if (!file) return;

        const storageRef = ref(storage, `images/${unique_id}`);
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
                    console.log(downloadURL);
                    setImgUrl(downloadURL);

                    // save to state
                    let tmpShopImages = createShopImages;
                    tmpShopImages.push(downloadURL);
                    setCreateShopImages(tmpShopImages);
                });
            }
        );
    }

    const handleUploadImages = (e) => {
        e.preventDefault();
        const files = uploadedFiles;

        files.forEach(file => {
            handleUploadSingleImage(file);
        });
    }

    const handleSubmitCreateShopForm = () => {
        // console.log(createShopName);
        // console.log(createShopAddress);
        // console.log(createShopHour);
        // console.log(createShopNumber);
        // console.log(createShopImages);

        const options = {
            method: 'PUT',
            url: 'http://localhost:8000/api/bobashop/',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            data: {
                "shop_name": createShopName,
                "telephone": createShopNumber,
                "address": createShopAddress,
                "hour": {
                    "start": createShopHour[0],
                    "end": createShopHour[1]
                },
                "images": [...createShopImages]
            }
        };

        const createShop = async () => {
            const result = await axios.request(options)
                .then(res => res.data)
                .catch(err => console.log(err));

            console.log("result: ", result);
        }

        if (progresspercent == 100) {
            createShop();
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
                        onMouseEnter={handleCreateShopMouseEnter}
                        onMouseLeave={handleCreateShopMouseLeave}
                        size='large'
                        style={{
                            borderRadius: 0,
                            backgroundColor: isHoverCreateShop ? '#FDD0CF' : 'white',
                            color: isHoverCreateShop ? 'white' : 'black',
                            borderColor: isHoverCreateShop ? '#FDD0CF' : '#d7d7d7',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            // marginTop: 20
                        }}
                        onClick={toggleCreateShopOverlay}
                        block
                    >
                        Create shop
                    </Button>

                    {showCreateShopOverlay &&
                        <Form style={{
                            marginTop: 10
                        }}>
                            <Form.Item
                                label="Shop name"
                                name="shop name"
                                rules={[{ message: 'Please input your shop name!' }]}
                            >
                                <Input

                                    value={createShopName}
                                    onChange={e => setCreateShopName(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ message: 'Please input your shop address!' }]}
                            >
                                <Input
                                    value={createShopAddress}
                                    onChange={e => setCreateShopAddress(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Hours"
                                name="hours"
                            // rules={[{ message: 'Please input your shop working hours!' }]}
                            >
                                <TimePicker.RangePicker
                                    value={createShopHour}
                                    onChange={e => setCreateShopHour([e[0].$d.toTimeString(), e[1].$d.toTimeString()])}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Contact number"
                                name="telephoneNumber"
                                rules={[{ message: 'Please input your shop telephone number!' }]}
                            >
                                <Input
                                    // addonBefore={prefixSelector} 
                                    style={{ width: '100%' }}
                                    type="number"
                                    value={createShopNumber}
                                    onChange={e => setCreateShopNumber(e.target.value)}
                                />
                            </Form.Item>

                            <div
                                style={{
                                    marginBottom: 10
                                }}
                            >
                                Upload shop images:
                            </div>
                            <input
                                type="file"
                                multiple
                                onChange={(e) => {
                                    // handle over 5 images uploaded
                                    // get only top 5 most recent uploaded
                                    if (uploadedFiles.length + e.target.files.length > 5) {
                                        setUploadedFiles([...uploadedFiles, ...e.target.files].slice(-5));
                                    }
                                    else {
                                        setUploadedFiles([...uploadedFiles, ...e.target.files]);
                                    }
                                }}
                                style={{
                                    marginBottom: 10
                                }}
                                accept="image/*"
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    marginBottom: 30
                                }}
                            >
                                <b>Chosen Images</b>
                                {
                                    uploadedFiles.map(file =>
                                        <div>
                                            {file.name}
                                        </div>
                                    )
                                }
                            </div>

                            {/* <button
                                onClick={handleUploadImages}
                                style={{
                                    marginBottom: 10
                                }}
                            >
                            </button> */}

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Button
                                    onClick={handleUploadImages}
                                    style={{
                                        marginBottom: 10
                                    }}
                                >
                                    Upload to Google Blob
                                </Button>

                                {
                                    !imgUrl &&
                                    <div>
                                        <div style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                                    </div>
                                }

                                <Button
                                    onMouseEnter={handleHoverSubmitCreateShopEnter}
                                    onMouseLeave={handleHoverSubmitCreateShopLeave}
                                    style={{
                                        backgroundColor: isHoverSubmitCreateShop ? '#FDD0CF' : 'white',
                                        color: isHoverSubmitCreateShop ? 'white' : 'black',
                                        borderColor: isHoverSubmitCreateShop ? '#FDD0CF' : '#d7d7d7',
                                    }}
                                    type="primary"
                                    htmlType="submit"
                                    onClick={handleSubmitCreateShopForm}
                                >
                                    Submit
                                </Button>
                            </div>
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
                            // marginTop: 60
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

export default ShopOwnerInfo;
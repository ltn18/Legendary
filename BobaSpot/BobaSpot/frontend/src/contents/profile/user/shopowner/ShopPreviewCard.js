import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import {
    Image, Button, Space,
    Form, Input, Select,
    TimePicker, DatePicker,
    Upload,
    InputNumber
} from 'antd';
import { UploadOutlined, InboxOutlined, StarOutlined } from '@ant-design/icons';
import axios from 'axios'

const { Option } = Select;

const ShopPreviewCard = (props) => {
    const {
        reviewText
    } = props;

    const navigate = useNavigate();

    const [isHoverDeleteShop, setIsHoverDeleteShop] = useState(false);
    const [isHoverChangeShopInfo, setIsHoverChangeShopInfo] = useState(false);
    const [isHoverSubmitCreateShop, setIsHoverSubmitCreateShop] = useState(false);
    const [showChangeShopInfoOverlay, setShowChangeShopInfoOverlay] = useState(false);

    // change shop's info
    const [changeShopName, setChangeShopName] = useState('');
    const [changeShopAddress, setChangeShopAddress] = useState('');
    const [changeShopHour, setChangeShopHour] = useState([]);
    const [changeShopNumber, setChangeShopNumber] = useState('');

    // shop preview
    const [isHoverShopName, setIsHoverShopName] = useState(false);

    // TODO: fetch user's shop data
    const [shopData, setShopData] = useState({
        id: "123"
    })

    const handleShopNameMouseEnter = () => {
        setIsHoverShopName(true);
    }

    const handleShopNameMouseLeave = () => {
        setIsHoverShopName(false);
    }

    const handleDeleteShopMouseEnter = () => {
        setIsHoverDeleteShop(true);
    };

    const handleClickOnShopName = () => {
        navigate(`/bobaplace/${shopData.id}`)
    }

    const handleDeleteShopMouseLeave = () => {
        setIsHoverDeleteShop(false);
    };

    const handleChangeShopInfoMouseEnter = () => {
        setIsHoverChangeShopInfo(true);
    };

    const handleChangeShopInfoMouseLeave = () => {
        setIsHoverChangeShopInfo(false);
    };

    const handleHoverSubmitCreateShopEnter = () => {
        setIsHoverSubmitCreateShop(true);
    }

    const handleHoverSubmitCreateShopLeave = () => {
        setIsHoverSubmitCreateShop(false);
    }

    const handleShowChangeShopOverlay = () => {
        setShowChangeShopInfoOverlay(!showChangeShopInfoOverlay);
    }

    const handleSubmitChangeShopInfo = () => {
        console.log(changeShopName);
        console.log(changeShopAddress);
        console.log(changeShopHour);
        console.log(changeShopNumber);

        // const data = {
        //     shop_name: changeShopName,
        //     telephone: changeShopNumber,
        //     address: changeShopAddress,
        //     hour: {
        //         start: changeShopHour[0],
        //         end: changeShopHour[1]
        //     }
        // }

        const options = {
            method: 'PUT',
            url: 'http://localhost:8000/api/bobashop/',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            data: {
                "shop_name": changeShopName,
                "telephone": changeShopNumber,
                "address": changeShopAddress,
                "hour": {
                    "start": changeShopHour[0],
                    "end": changeShopHour[1]
                },
                // "images": [...createShopImages]
            }
        };

        axios.request(options)
            .then(res => res.data)
            .catch(err => console.log(err))
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
            width: '90%',
            height: '60%',
            top: '30%',
            backgroundColor: 'white',
            color: 'black',
            padding: 20,
            margin: 5,
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <div style={{
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <div style={{
                    width: '80%',
                }}>
                    <Image height={'100%'} src="https://pheastatl.com/wp-content/uploads/2019/09/kung-fu-tea-logo.jpg" />
                </div>
                <div
                    style={{
                        // put something here if needed
                    }}
                >
                    Overall rating: 4.3 <StarOutlined />
                </div>
            </div>
            <div style={{
                width: '40%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                fontSize: '20px'
            }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{
                        fontSize: 25,
                        fontWeight: 'bolder'
                    }}>
                        <div
                            onMouseEnter={handleShopNameMouseEnter}
                            onMouseLeave={handleShopNameMouseLeave}
                            style={{
                                textDecoration: isHoverShopName ? 'underline' : 'none',
                                color: isHoverShopName ? '#FFB6C1' : 'black',
                                cursor: 'pointer'
                            }}
                            onClick={handleClickOnShopName}
                        >
                            Kung Fu Tea
                        </div>
                    </div>
                    <div style={{
                        marginTop: 20
                    }}>
                        <div>
                            <b>Address: </b>
                            11312 Euclid Ave, Cleveland, OH, 44106
                        </div>
                        <div>
                            <b>Hours: </b>
                            12:00pm - 19:30pm
                        </div>
                        <div>
                            <b>Tel: </b>
                            (216) 862-7690
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    width: '30%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <Button
                    size='large'
                    onMouseEnter={handleChangeShopInfoMouseEnter}
                    onMouseLeave={handleChangeShopInfoMouseLeave}
                    style={{
                        backgroundColor: isHoverChangeShopInfo ? '#FDD0CF' : 'white',
                        color: isHoverChangeShopInfo ? 'white' : 'black',
                        borderColor: isHoverChangeShopInfo ? '#FDD0CF' : '#d7d7d7',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                    }}
                    onClick={handleShowChangeShopOverlay}
                    block
                >
                    Change shop's info
                </Button>

                {
                    showChangeShopInfoOverlay &&
                    <Form style={{
                        marginTop: 10
                    }}>
                        <Form.Item
                            label="Shop name"
                            name="shop name"
                            value={changeShopName}
                            onChange={e => setChangeShopName(e.target.value)}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Address"
                            name="address"
                        >
                            <Input
                                value={changeShopAddress}
                                onChange={e => setChangeShopAddress(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hours"
                            name="hours"
                        >
                            <TimePicker.RangePicker
                                value={changeShopHour}
                                onChange={e => setChangeShopHour([e[0].$d.toTimeString(), e[1].$d.toTimeString()])}
                            />
                        </Form.Item>

                        {/* allow number only */}
                        <Form.Item
                            label="Contact number"
                            name="telephoneNumber"
                            rules={[{ message: 'Please input your shop telephone number!' }]}
                        >
                            <Input
                                // addonBefore={prefixSelector}
                                style={{ width: '100%' }}
                                type="number"
                                value={changeShopNumber}
                                onChange={e => setChangeShopNumber(e.target.value)}
                            />
                        </Form.Item>
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
                            onClick={handleSubmitChangeShopInfo}
                        >
                            Submit
                        </Button>
                    </Form>
                }

                <Button
                    onMouseEnter={handleDeleteShopMouseEnter}
                    onMouseLeave={handleDeleteShopMouseLeave}
                    size='large'
                    style={{
                        backgroundColor: isHoverDeleteShop ? '#ff0e0e' : 'white',
                        color: isHoverDeleteShop ? 'white' : '#ff0e0e',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                    }}
                    danger
                    block
                >
                    Delete shop
                </Button>
            </div>
        </div>
    )
}

export default ShopPreviewCard;
import React, { useState } from 'react';
import { Button, Image } from 'antd';
import { StarOutlined } from '@ant-design/icons';

const ShopPreviewCard = (props) => {
    const {
        reviewText
    } = props;

    const [isHoverDeleteShop, setIsHoverDeleteShop] = useState(false);
    const [isHoverChangeShopInfo, setIsHoverChangeShopInfo] = useState(false);

    const handleDeleteShopMouseEnter = () => {
        setIsHoverDeleteShop(true);
    };

    const handleDeleteShopMouseLeave = () => {
        setIsHoverDeleteShop(false);
    };

    const handleChangeShopInfoMouseEnter = () => {
        setIsHoverChangeShopInfo(true);
    };

    const handleChangeShopInfoMouseLeave = () => {
        setIsHoverChangeShopInfo(false);
    };

    return (
        <div style={{
            width: '90%',
            height: '50%',
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
                justifyContent: 'space-between'
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
                        Kung Fu Tea
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
                    block
                >
                    Change shop's info
                </Button>

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
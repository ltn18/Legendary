import React, { useState } from 'react';
import { Button, Image } from 'antd';
import { StarOutlined } from '@ant-design/icons';

const ReviewCard = (props) => {

    // Escanord Le reviewed Koko Bakery: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    // Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    // when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    // It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    // It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
    // and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    const {
        handleCloseOverlay,
        firstName,
        lastName,
        reviewText,
        date,
        rating,
        drinkOrdered,
        id
    } = props;

    const [isHoverLogout, setIsHoverLogout] = useState(false);

    const dummyText = `
    Escanord Le reviewed Koko Bakery: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages"
    `

    const handleLogoutMouseEnter = () => {
        setIsHoverLogout(true);
    };

    const handleLogoutMouseLeave = () => {
        setIsHoverLogout(false);
    };

    return (
        <div style={{
            width: '65%',
            height: '30%',
            top: '20%',
            backgroundColor: '#FFB6C1',
            color: 'black',
            padding: 20,
            margin: 10,
            position: 'fixed',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <div style={{
                width: '20%',
                marginRight: 10,
            }}>
                <Image height={'80%'} src="https://i.ytimg.com/an/zlwQERpksnw/14720571135996419329_mq.jpg?v=6286689c" />
            </div>
            <div style={{
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                            fontSize: '20px'
                        }}
                    >
                        <div style={{
                            fontSize: 25,
                            fontWeight: 'bolder'
                        }}>{firstName} {lastName}</div>
                        {/* <div>Date: {date}</div> */}
                        <div>Rating: {rating} <StarOutlined /> </div>
                        <div>Drink ordered: {drinkOrdered}</div>
                    </div>
                    <div style={{
                        marginBottom: 10,
                        maxWidth: '300ch',
                        fontSize: '20px'
                    }}                    >
                        {/* {dummyText} */}
                        {reviewText}
                    </div>
                </div>
                <Button
                    onMouseEnter={handleLogoutMouseEnter}
                    onMouseLeave={handleLogoutMouseLeave}
                    size='large'
                    style={{
                        borderRadius: 0,
                        width: '20%',
                        backgroundColor: isHoverLogout ? '#ff0e0e' : 'white',
                        color: isHoverLogout ? 'white' : '#ff0e0e',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                    }}
                    onClick={handleCloseOverlay}
                    block
                    danger
                >
                    Close
                </Button>
            </div>
        </div>
    )
}

export default ReviewCard;
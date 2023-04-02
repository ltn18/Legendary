import React, { useState } from 'react';
import { Button } from 'antd';

const SingleComment = (props) => {

    // Escanord Le reviewed Koko Bakery: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    // Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    // when an unknown printer took a galley of type and scrambled it to make a type specimen book.
    // It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    // It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
    // and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    const {
        handleShowMoreComment, onCloseSingleComment, toggleShowOverlay,
        reviewText
    } = props;

    const [isHoverButton, setIsHoverButton] = useState(false);

    const handleButtonMouseEnter = () => {
        setIsHoverButton(true)
    }

    const handleButtonMouseLeave = () => {
        setIsHoverButton(false)
    }

    return (
        <div style={{
            width: '95%',
            height: '100px',
            backgroundColor: 'white',
            color: 'black',
            padding: 10,
            margin: 10,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
        }}>
            <div style={{ marginBottom: 10 }}>Date: 03/31/2023</div>
            <div style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: '300ch',
                marginBottom: 10
            }}>
                {/* {reviewText} */}
                Escanord Le reviewed Koko Bakery: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            </div>
            <Button
                onMouseEnter={handleButtonMouseEnter}
                onMouseLeave={handleButtonMouseLeave}
                style={{
                    backgroundColor: isHoverButton ? '#FDD0CF' : 'white',
                    color: isHoverButton ? 'white' : 'black',
                    borderColor: isHoverButton ? '#FDD0CF' : '#d7d7d7'
                }}
                onClick={handleShowMoreComment}
            >
                Click to see more
            </Button>
        </div>
    )
}

export default SingleComment;
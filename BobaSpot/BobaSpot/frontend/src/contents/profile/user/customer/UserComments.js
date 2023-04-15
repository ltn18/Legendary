import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';
import ReviewCard from './ReviewCard';
import axios from 'axios';

const UserComments = () => {
    const [showOverlay, setShowOverlay] = useState(false);

    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        image_url: ''
    });

    // comments dummy data
    const [dummyComments, setDummyComments] = useState([
        {
            reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
            date: "04/10/2023",
            firstName: data.first_name,
            lastName: data.last_name,
            rating: "4.5",
            drinkOrdered: "Kung Fu Milk Tea"
        },
        {
            reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
            date: "04/10/2023",
            firstName: data.first_name,
            lastName: data.last_name,
            rating: "4",
            drinkOrdered: "Oolong Milk Tea"
        },
        {
            reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
            date: "04/10/2023",
            firstName: data.first_name,
            lastName: data.last_name,
            rating: "5",
            drinkOrdered: "Mango Slush"
        }
    ])

    useEffect(() => {
        const fetchUser = async () => {
            const result = await axios.get('http://localhost:8000/api/user/', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                }
            })
            setData(result.data);
            setDummyComments([
                {
                    reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
                    date: "04/10/2023",
                    firstName: data.first_name,
                    lastName: data.last_name,
                    rating: "4.5",
                    drinkOrdered: "Kung Fu Milk Tea"
                },
                {
                    reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
                    date: "04/10/2023",
                    firstName: data.first_name,
                    lastName: data.last_name,
                    rating: "4",
                    drinkOrdered: "Oolong Milk Tea"
                },
                {
                    reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
                    date: "04/10/2023",
                    firstName: data.first_name,
                    lastName: data.last_name,
                    rating: "5",
                    drinkOrdered: "Mango Slush"
                }
            ])
        }

        fetchUser();
    }, [data])

    const handleShowMoreComment = () => {
        setShowOverlay(true);
    }

    const handleCloseOverlay = () => {
        setShowOverlay(false);
    }

    return (
        <div
            style={{
                background: '#FDD0CF',
                height: '100%',
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // filter: showOverlay ? 'blur(5px)' : 'none'
            }}>
                {
                    dummyComments.map(comment =>
                        <>
                            <SingleComment
                                reviewText={comment.reviewText}
                                date={comment.date}
                                handleShowMoreComment={handleShowMoreComment}
                                toggleShowOverlay={showOverlay}
                            />
                            {showOverlay &&
                                <ReviewCard
                                    reviewText={comment.reviewText}
                                    date={comment.date}
                                    firstName={comment.firstName}
                                    lastName={comment.lastName}
                                    rating={comment.rating}
                                    drinkOrdered={comment.drinkOrdered}
                                    handleCloseOverlay={handleCloseOverlay}
                                />
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default UserComments;
import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';
import ReviewCard from './ReviewCard';
import axios from 'axios';

const UserComments = () => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [clickedComment, setClickedComment] = useState(-1);

    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        image_url: ''
    });

    const [reviews, setReviews] = useState([]);

    // comments dummy data
    const [dummyComments, setDummyComments] = useState([
        {
            id: 0,
            reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
            date: "04/10/2023",
            firstName: data.first_name,
            lastName: data.last_name,
            rating: "0",
            drinkOrdered: "Kung Fu Milk Tea"
        },
        {
            id: 1,
            reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
            date: "04/10/2023",
            firstName: data.first_name,
            lastName: data.last_name,
            rating: "1",
            drinkOrdered: "Oolong Milk Tea"
        },
        {
            id: 2,
            reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
            date: "04/10/2023",
            firstName: data.first_name,
            lastName: data.last_name,
            rating: "2",
            drinkOrdered: "Mango Slush"
        },
        {
            id: 3,
            reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
            date: "04/10/2023",
            firstName: data.first_name,
            lastName: data.last_name,
            rating: "3",
            drinkOrdered: "Kung Fu Milk Tea"
        },
        {
            id: 4,
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
            id: 5,
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
        },
        {
            id: 6,
            reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
            date: "04/10/2023",
            firstName: data.first_name,
            lastName: data.last_name,
            rating: "6",
            drinkOrdered: "Kung Fu Milk Tea"
        },
        {
            id: 7,
            reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
            date: "04/10/2023",
            firstName: data.first_name,
            lastName: data.last_name,
            rating: "7",
            drinkOrdered: "Oolong Milk Tea"
        },
        {
            id: 8,
            reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
            date: "04/10/2023",
            firstName: data.first_name,
            lastName: data.last_name,
            rating: "8",
            drinkOrdered: "Mango Slush"
        },
        {
            id: 9,
            reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
            date: "04/10/2023",
            firstName: data.first_name,
            lastName: data.last_name,
            rating: "9",
            drinkOrdered: "Kung Fu Milk Tea"
        },
        {
            id: 10,
            reviewText: `${data.first_name} ${data.last_name} reviewed Koko Bakery: \"Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\"`,
            date: "04/10/2023",
            firstName: data.first_name,
            lastName: data.last_name,
            rating: "10",
            drinkOrdered: "Oolong Milk Tea"
        },
    ])

    useEffect(() => {

        const fetchUser = async () => {
            const result = await axios.get('http://localhost:8000/api/user/', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                }
            })
            setData(result.data);

            const optionsGetReview = {
                method: 'GET',
                url: 'http://localhost:8000/api/reviews/',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            };

            axios.request(optionsGetReview)
                .then(res => {
                    // process res.data
                    let resultReviews = res.data.reviews;
                    console.log(resultReviews);
                    resultReviews = resultReviews.map(review => {
                        // console.log(review);

                        let obj = {
                            id: review.review_id,
                            reviewText: review.text,
                            rating: review.rating,
                            firstName: data.first_name,
                            lastName: data.last_name
                        }
                        return obj;
                    });

                    const MAX_COMMENTS = 6;

                    const showReviews = resultReviews.length > MAX_COMMENTS
                        ? [...resultReviews.slice(-MAX_COMMENTS)]
                        : [...resultReviews];
                        
                    setReviews(showReviews);
                })
                .catch(err => console.log(err))

            // slice dummy comments to only max 7 latest
            // we should sort ascending order
            // -> 7 will be highest rating
            // setDummyComments([
            //     ...dummyComments.slice(-MAX_COMMENTS)
            // ])
        }

        fetchUser();
    }, [data])

    const handleShowMoreComment = (id) => {
        setShowOverlay(true);
        setClickedComment(id);
    }

    const handleCloseOverlay = () => {
        setShowOverlay(false);
        setClickedComment(-1);
    }

    const toggleShowOverlay = (id) => {
        setShowOverlay(!showOverlay);
        setClickedComment(id === null ? -1 : id);
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
                    reviews.map(comment =>
                        <>
                            <SingleComment
                                id={comment.id}
                                reviewText={comment.reviewText}
                                firstName={comment.firstName}
                                lastName={comment.lastName}
                                date={comment.date}
                                handleShowMoreComment={() => handleShowMoreComment(comment.id)}
                                toggleShowOverlay={() => toggleShowOverlay(comment.id)}
                            />
                            {showOverlay && clickedComment === comment.id &&
                                (
                                    <ReviewCard
                                        id={comment.id}
                                        reviewText={comment.reviewText}
                                        date={comment.date}
                                        firstName={comment.firstName}
                                        lastName={comment.lastName}
                                        rating={comment.rating}
                                        drinkOrdered={comment.drinkOrdered}
                                        handleCloseOverlay={() => toggleShowOverlay(null)}
                                    />
                                )
                            }
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default UserComments;
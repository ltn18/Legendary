import React from 'react';
import { render, screen } from '@testing-library/react';
import UserComments from '../../contents/profile/user/customer/UserComments';

describe('UserComments component', () => {
    it('renders the user comments', () => {
        const comments = [
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
        ]
        render(
            <ReviewCard
                id={comment.id}
                reviewText={comment.reviewText}
                date={comment.date}
                firstName={comment.firstName}
                lastName={comment.lastName}
                rating={comment.rating}
                drinkOrdered={comment.drinkOrdered}
            />
        );
        const reviewTextElement = screen.getByText('This is a test review');
        expect(reviewTextElement).toBeInTheDocument();
    });
});
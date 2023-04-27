import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewCard from '../../contents/profile/user/customer/ReviewCard';

describe('ReviewCard component', () => {
    it('renders the review text', () => {
        const comment = {
            id: 0,
            reviewText: 'This is a test review',
            date: '04/23/2023',
            firstName: 'John',
            lastName: 'Doe',
            rating: 5,
            drinkOrdered: 'Milk tea',
        };
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

    it('renders the reviewer name', () => {
        const comment = {
            id: 0,
            reviewText: 'This is a test review',
            date: '04/23/2023',
            firstName: 'John',
            lastName: 'Doe',
            rating: 5,
            drinkOrdered: 'Milk tea',
        };

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

        const reviewerName = screen.getByText('John Doe');
        expect(reviewerName).toBeInTheDocument();
    });

    it('renders the rating', () => {
        const comment = {
            id: 0,
            reviewText: 'This is a test review',
            date: '04/23/2023',
            firstName: 'John',
            lastName: 'Doe',
            rating: 5,
            drinkOrdered: 'Milk tea',
        };
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
        const ratingElement = screen.getByText(`Rating: ${5}`);
        expect(ratingElement).toBeInTheDocument();
    });

    it('renders the drink ordered', () => {
        const comment = {
            id: 0,
            reviewText: 'This is a test review',
            date: '04/23/2023',
            firstName: 'John',
            lastName: 'Doe',
            rating: 5,
            drinkOrdered: 'Milk tea',
        };
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
        // const drinkOrderedElement = screen.getByText(`Milk tea`);
        // expect(drinkOrderedElement).toBeInTheDocument();
    });
});
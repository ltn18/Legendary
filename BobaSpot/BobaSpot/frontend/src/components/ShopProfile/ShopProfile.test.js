import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import ShopProfile from './ShopProfile';

// Mock the axios library
jest.mock('axios');

describe('ShopProfile', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the shop profile with initial data', async () => {
        const mockData = {
            image_url: 'https://example.com/shop_image.jpg',
            rating: 4.5,
            shop_name: 'Boba Shop',
            address: '123 Boba St.',
            opening_hour: '08:00',
            closing_hour: '20:00',
            telephone: '555-1234',
            ad_image_url: ['https://example.com/ad1.jpg', 'https://example.com/ad2.jpg'],
            top_drink: [
                {
                    drink_name: 'Caffè macchiato',
                    image_url: 'https://example.com/drink1.jpg',
                    rating: 4.8,
                },
                {
                    drink_name: 'Pink drink',
                    image_url: 'https://example.com/drink2.jpg',
                    rating: 4.6,
                },
            ],
            reviews: [],
        };

        axios.request.mockResolvedValue({ data: mockData });

        render(<ShopProfile />);

        await waitFor(() => expect(axios.request).toHaveBeenCalledTimes(1));

        expect(screen.getByText('Boba Shop')).toBeInTheDocument();
        expect(screen.getByText('Address:')).toBeInTheDocument();
        expect(screen.getByText('123 Boba St.')).toBeInTheDocument();
        expect(screen.getByText('Hours:')).toBeInTheDocument();
        expect(screen.getByText('08:00 - 20:00')).toBeInTheDocument();
        expect(screen.getByText('Tel:')).toBeInTheDocument();
        expect(screen.getByText('555-1234')).toBeInTheDocument();
    });

    it('submits a new review', async () => {
        const mockData = {
            image_url: 'https://example.com/shop_image.jpg',
            rating: 4.5,
            shop_name: 'Boba Shop',
            address: '123 Boba St.',
            opening_hour: '08:00',
            closing_hour: '20:00',
            telephone: '555-1234',
            ad_image_url: ['https://example.com/ad1.jpg', 'https://example.com/ad2.jpg'],
            top_drink: [
                {
                    drink_name: 'Caffè macchiato',
                    image_url: 'https://example.com/drink1.jpg',
                    rating: 4.8,
                },
                {
                    drink_name: 'Pink drink',
                    image_url: 'https://example.com/drink2.jpg',
                    rating: 4.6,
                },
            ],
            reviews: [],
        };

        axios.request.mockResolvedValue({ data: mockData });
        axios.request.mockResolvedValueOnce({ data: {} });

        render(<ShopProfile />);

        await waitFor(() => expect(axios.request).toHaveBeenCalledTimes(1));

        const textarea = screen.getByPlaceholderText('Write a text here');
        const select = screen.getByText('Select');
        const rateStars = screen.getByTestId('rate-stars');
        const sendButton = screen.getByRole('button', { name: /send/i });

        fireEvent.change(textarea, { target: { value: 'Great shop!' } });
        fireEvent.change(select, { target: { value: '1' } });
        fireEvent.click(rateStars, { button: 0 });
        fireEvent.click(sendButton);

        await waitFor(() => expect(axios.request).toHaveBeenCalledTimes(2));

        expect(axios.request).toHaveBeenCalledWith(
            expect.objectContaining({
                url: '/api/reviews',
                method: 'put',
                data: expect.objectContaining({
                    review: 'Great shop!',
                    rate: '5',
                }),
            }),
        );
    });
});


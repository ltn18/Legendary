import React from 'react';
import { render, screen } from '@testing-library/react';
import ShopPreviewCard from '../../contents/profile/user/shopowner/ShopPreviewCard';

describe('ShopPreviewCard component', () => {
    it('renders the shop preview data', () => {
        const shopData = {
            id: '123',
            logo_url: '',
            shop_name: 'hello world',
            address: 'this is an address',
            tel: '123123123',
            hours: {
                start: '00:00:00',
                end: '14:00:00'
            },
            rating: 5
        };
        render(
            <ShopPreviewCard
                shopData={shopData}
            />
        );

        const shopName = screen.getByText('hello world')
        const shopAddress = screen.getByText('Address: this is an address')
        const shopTel = screen.getByText('Tel: 123123123')
        const shopHour = screen.getByText('Hours: 00:00:00 - 14:00:00')
        const shopRating = screen.getByText('Overall rating: 5')

        expect(shopName).toBeInTheDocument();
        expect(shopAddress).toBeInTheDocument();
        expect(shopTel).toBeInTheDocument();
        expect(shopHour).toBeInTheDocument();
        expect(shopRating).toBeInTheDocument();
    });
});
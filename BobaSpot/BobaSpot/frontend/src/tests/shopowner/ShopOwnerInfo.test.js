import React from 'react';
import { render, screen } from '@testing-library/react';
import ShopOwnerInfo from '../../contents/profile/user/shopowner/ShopOwnerInfo';

describe('ShopOwner Info component', () => {
    it('renders ShopOwnerInfo component', () => {
        const userData = {
            id: '123',
            first_name: "John",
            last_name: "Doe",
            image_url: null
        }

        render(<ShopOwnerInfo data={userData}/>);

        const shopOwner = screen.getByText('John Doe');
        expect(shopOwner).toBeInTheDocument();
    });
});
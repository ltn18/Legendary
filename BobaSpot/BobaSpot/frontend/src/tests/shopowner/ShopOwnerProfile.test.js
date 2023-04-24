import React from 'react';
import { render, screen } from '@testing-library/react';
import ShopOwnerProfile from "../../contents/profile/user/shopowner/UserProfile";

describe('ShopOwnerProfile component', () => {
    it('renders ShopOwnerInfo and ShopPreview components', () => {
      const { getByTestId } = render(<ShopOwnerProfile />);
      const shopOwnerInfo = getByTestId('shopowner-info');
      const shopPreview = getByTestId("shopowner-preview");
      expect(shopOwnerInfo).toBeInTheDocument();
      expect(shopPreview).toBeInTheDocument();
    });
  });
import React from 'react';
import { render, screen } from '@testing-library/react';
import ShopPreview from "../../contents/profile/user/shopowner/ShopPreview";

describe('ShopPreview component', () => {
    it('renders ShopPreview component', () => {
      const { getByTestId } = render(<ShopPreview />);
      const shopPreviewCard = getByTestId('shoppreview-card');
      expect(shopPreviewCard).toBeInTheDocument();
    });
  });
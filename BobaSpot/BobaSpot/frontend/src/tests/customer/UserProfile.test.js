import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from "../../contents/profile/user/customer/UserProfile";

describe('UserProfile', () => {
    it('renders UserInfo and UserComments components', () => {
      const { getByTestId } = render(<UserProfile />);
      const userInfoElement = getByTestId('user-info');
      const userCommentsElement = getByTestId('user-comments');
      expect(userInfoElement).toBeInTheDocument();
      expect(userCommentsElement).toBeInTheDocument();
    });
  });
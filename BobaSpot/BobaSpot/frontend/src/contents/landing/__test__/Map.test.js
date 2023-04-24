import React from 'react';
import { render } from '@testing-library/react';
import Map from '../Map';

// jest.mock('axios');
// jest.mock('@react-google-maps/api');
// jest.mock('antd/es/form/Form');

describe('Map', () => {
  it('renders correctly', () => {
    const { getMap } = render(<Map />);
      const MapElement = getMap('user-info');
      expect(MapElement).toBeInTheDocument();
  });
});

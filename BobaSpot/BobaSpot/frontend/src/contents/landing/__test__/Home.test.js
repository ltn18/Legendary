import React from 'react';
import { render } from '@testing-library/react';
import Home from '../Home';
// import { Button, Input, Form, InputNumber, Rate, Col, Row } from 'antd';
// import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// import { StarOutlined } from '@ant-design/icons';
// import { Outlet, Link } from "react-router-dom";
// import { useForm } from 'antd/es/form/Form';
// /* global google */


// jest.mock('@react-google-maps/api');
// jest.mock('antd');
// jest.mock('@ant-design/icons');
// jest.mock('react-router-dom');

describe('Home', () => {
  it('renders correctly', () => {
    const { getHome } = render(<Home />);
      const HomeElement = getHome('user-info');
      expect(HomeElement).toBeInTheDocument();
  });
});

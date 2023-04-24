import React from 'react';
import { render } from '@testing-library/react';
import Map from '../Map';
import { Button, Input, Form, InputNumber, Rate, Col, Row } from 'antd';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { StarOutlined } from '@ant-design/icons';
import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import { useForm } from 'antd/es/form/Form';
/* global google */


jest.mock('axios');
jest.mock('@react-google-maps/api');
jest.mock('antd');
jest.mock('@ant-design/icons');
jest.mock('react-router-dom');

describe('Map', () => {
  it('renders correctly', () => {
    const { getMap } = render(<Map />);
      const MapElement = getMap('user-info');
      expect(MapElement).toBeInTheDocument();
  });
});

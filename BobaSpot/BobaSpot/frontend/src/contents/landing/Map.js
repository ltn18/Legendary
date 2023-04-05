import React, { useState } from 'react'
import { Button, Input, Form, InputNumber, Rate, Col, Row } from 'antd';
import testData from "./us-capitals.json";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
/* global google */

const initialFormState = {
  BobaShop_name: '',
  address: '',
  Drink_name: ''
}


const Map = () => {
  const libraries = ['places'];
  const { isLoaded } = useLoadScript(
    {
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyDF2B7vD2UXJ7nRg74gVAzkRtomGBc5Vt0",
      libraries
    }
  );

  if(!isLoaded) return <div>Loading...</div>
  return <MapSearch />
}

function MapSearch() {
  const onFinish = (values) => {
    console.log(values);
    const address = values.address;
    console.log("Address:" + address);
    // const geocoder = new google.maps.Geocoder().geocode({'address': address}).then((response) => {
    //   if(response.results[0]){
    //     const latitude=response.results[0].geometry.location.lat();
    //     const longitude=response.results[0].geometry.location.lng();
    //     console.log("lat: "+ latitude + " lon: "+ longitude)
    //   }
    // });
  };
  const [form] = useState(initialFormState);
  const onReset = () => {
    form.resetFields();
  };

  const toggleSubmit = () =>{
    
  }
  
  return (
    <div>
      <Row>
        <Col span={6}>
          <Form 
            name='filter-search'
            className='search-form'
            onFinish={onFinish}
            >
            <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Please input your preferred store location!',
              }
            ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
            name="drink_name"
            label="Drink name"
            rules={[
              {
                required: true,
                message: 'Please input your preferred drink name!',
              }
            ]}
            >
              <Input />
            </Form.Item>
            
            <Form.Item
            name="shop_name"
            label="Shop name"
            >
              <Input />
            </Form.Item>
            
            <Form.Item
              name="min_rating"
              label="Minimum rating"
            >
              <Rate allowHalf defaultValue={0} />
            </Form.Item>

            <Form.Item
              name="min_price"
              label="Minimum price"
            >
              <InputNumber prefix="$" />
            </Form.Item>

            <Form.Item
              name="max_price"
              label="Maximum price"
            >
              <InputNumber prefix="$" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

              <Button type='text' htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={16} offset={2}>
          <GoogleMap
            zoom={10}
            center={{lat: 40, lng: -80}}
            mapContainerClassName="map-container"
          >
            {testData.map((shop)=>(
              <Marker
                key={shop.Rk}
                position={{lat: shop.latitude, lng:shop.longitude}}
              ></Marker>
            ))}
          </GoogleMap>
        </Col>
      </Row>
    </div>
  )
}

export default Map;
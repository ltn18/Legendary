import React, { useState } from 'react'
import { Button, Input, Select, Form } from 'antd';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
/* global google */

const { Search } = Input;
const { Option } = Select;

const initialFormState = {
  BobaShop_name: '',
  address: '',
  Drink_name: ''
}


const Map = () => {

  const { isLoaded } = useLoadScript(
    {
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyDF2B7vD2UXJ7nRg74gVAzkRtomGBc5Vt0",
      libraries: ['places'],
    }
  );

    if(!isLoaded) return <div>Loading...</div>
    return <MapSearch />
  }

function MapSearch() {

  let marker;
  const onFinish = (values) => {
    console.log(values);
    const address = values.address;
    console.log("Address:" + address);
    // const geocoder = new google.maps.Geocoder().geocode({'address': address}).then((response) => {
    //   if(response.results[0]){
    //     const latitude=response.results[0].geometry.location.lat();
    //     const longitude=response.results[0].geometry.location.lng();
    //     marker = {lat: latitude, lng: longitude};
    //   }
    // });
  };
  const [form] = useState(initialFormState);
  const onReset = () => {
    form.resetFields();
  };
  
  return (
    <div>
        <Form 
        name='filter-search'
        className='search-form'
        onFinish={onFinish}
        >
          <Form.Item
          name="BobaShop_name"
          label="Shop name"
          >
            <Input />
          </Form.Item>

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
          name="Drink_name"
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      

      {/* <GoogleMap 
        zoom={10} 
        center={marker} 
        mapContainerClassName="map-container"
        >
          <Marker 
          position={marker}
          />
      </GoogleMap> */}
    </div>
  )
}

export default Map;
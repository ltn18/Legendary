import React from 'react'
import { Button, Input, Select, Form } from 'antd';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
/* global google */

const { Search } = Input;
const { Option } = Select;


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
  const center = {lat: 40, lng: -80}
  const onFinish = (values) => {
    console.log(values);
  };
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  const address = Form.useWatch("address", form);
  console.log("Address:" + address);
  const marker = {lat: 41.5096738, lng: -81.60274249999999};
  // const geocoder = new google.maps.Geocoder().geocode({'address': address}).then((response) => {
  //   if(response.results[0]){
  //     const latitude=response.results[0].geometry.location.lat();
  //     const longitude=response.results[0].geometry.location.lng();
  //     console.log(latitude)
  //     console.log(longitude)
  //   }
  // });

  // geocoder.geocode( { 'address': address}, function(results, status) {
  //   if (status === google.maps.GeocoderStatus.OK) {

  //     latitude = results[0].geometry.location.lat();
  //     longitude = results[0].geometry.location.lng();
  //   } 

  //   else {
  //     console.log("Geocode was not successful for the following reason: " + status);
  //   }
  // });
  return (
    <div>
        <Form 
        form={form}
        name='control-hooks'
        onFinish={onFinish}
        >
          <Form.Item
          name="BobaShop.name"
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
          name="Drink.name"
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
      

      <GoogleMap 
        zoom={10} 
        center={marker} 
        mapContainerClassName="map-container"
        >
          <Marker 
          position={marker}
          />
      </GoogleMap>
    </div>
  )
}

export default Map;
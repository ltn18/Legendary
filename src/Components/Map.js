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
              message: 'Please inpur your preferred store location',
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
              message: 'Please inpur your preferred drink name!',
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
        center={center} 
        mapContainerClassName="map-container"
        >
          <Marker 
          position={center} 
          />
      </GoogleMap>
    </div>
  )
}

export default Map;
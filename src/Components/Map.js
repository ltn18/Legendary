import React from 'react'
import { Button, Input, Select, Form } from 'antd';

const { Search } = Input;
const { Option } = Select;


const Map = () => {

  // const { isLoaded } = useLoadScript(
  //   {
  //     id: 'google-map-script',
  //     googleMapsApiKey: "AIzaSyBxZCkiGPOBS0rtuGSoiXLd-7tAKT94kgw",
  //     libraries: ['places'],
  //   }
  // );

  //   if(!isLoaded) return <div>Loading...</div>
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
        {/* <GoogleMap 
        zoom={10} 
        center={center} 
        mapContainerClassName="map-container"
        >
          <Marker 
          position={center} 
          />
        </GoogleMap> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Map;
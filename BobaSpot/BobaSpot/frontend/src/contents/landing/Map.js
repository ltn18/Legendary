import React, { useState } from 'react'
import { Button, Input, Form, InputNumber, Rate, Col, Row } from 'antd';
import testData from "./us-capitals.json";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { StarOutlined } from '@ant-design/icons';
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
  const [selectedMarker, setSelectedMarker] = useState("");
  const [center, setCenter] = useState({lat: 40, lng:-80});

  const [form] = useState(initialFormState);
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log(values);
    const address = values.address;
    console.log("Address:" + address);

    const geocoder = new google.maps.Geocoder().geocode({'address': values.address}).then((response) => {
      if(response.results[0]){
        const latitude=response.results[0].geometry.location.lat();
        const longitude=response.results[0].geometry.location.lng();
        console.log("lat: "+ latitude + " lon: "+ longitude)
      }
    });
  };

  const logoKFT = 'https://play-lh.googleusercontent.com/SUl4XjMnZ7AoG394N20DpStiI4e1jynSSVDsh6V6h4PzFBPn8UhZ2Sa9ZybBz5rWwEQ';
  
  return (
    <div>
      <Row>
        <Col span={4} offset={2}>
          <Form 
            name='filter-search'
            className='search-form'
            onFinish={onFinish}
            >
            <Form.Item
            name="address"
            label="Address"
            >
              <Input />
            </Form.Item>

            <Form.Item
            name="drink_name"
            label="Drink name"
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
        <Col span={15} offset={1}>
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="map-container"
          >
            {testData.map((shop)=>(
              <Marker
                key={shop.Rk}
                position={{lat: shop.latitude, lng:shop.longitude}}
                onClick={() => {setSelectedMarker(shop); 
                                setCenter({lat: shop.latitude, lng:shop.longitude})}}
              />
            ))}
            {selectedMarker && (
                  <InfoWindow
                    position={{lat: selectedMarker.latitude, lng: selectedMarker.longitude}}
                    onCloseClick={() => setSelectedMarker('')}
                  >
                    <div>
                      <Row>
                        <Col>
                          <img src={logoKFT} sizes='100px' alt='shop-logo' style={{ width: 80, height: 80 }}/>
                        </Col>
                        <Col>
                          <h1>{selectedMarker.description}</h1>
                          <p>Address: Cleveland, OH 44106</p>
                          <p>Hours: 12:00pm - 21:30pm</p>
                          <p>Ratings: 4.3 <StarOutlined /></p>
                        </Col>
                      </Row>
                    </div>
                  </InfoWindow>
                )}
          </GoogleMap>
        </Col>
      </Row>
    </div>
  )
}

export default Map;
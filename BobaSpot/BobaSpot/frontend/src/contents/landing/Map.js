import React, { useState } from 'react'
import { Button, Input, Form, InputNumber, Rate, Col, Row } from 'antd';
import testData from "./data.json";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { StarOutlined } from '@ant-design/icons';
import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import { useForm } from 'antd/es/form/Form';
/* global google */

// const initialFormState = {
//   shop_name: "",
//   address: "",
//   drink_name: '',
//   min_rating: 0
// }


const Map = () => {
  const libraries = ['places'];
  const { isLoaded } = useLoadScript(
    {
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyDF2B7vD2UXJ7nRg74gVAzkRtomGBc5Vt0",
      libraries
    }
  );

  if (!isLoaded) return <div>Loading...</div>
  return <MapSearch />
}

function MapSearch() {
  const [selectedMarker, setSelectedMarker] = useState("");
  const [center, setCenter] = useState({ lat: 41.5, lng: -81.6 });

  const jwt = sessionStorage.getItem('token');
  const url = "http://127.0.0.1:8000/api/search/";

  const [form] = Form.useForm();
  const [data, setData] = useState();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log(values);
    setSelectedMarker('')
    fetchData(values);
  };

  const fetchData = async (values) => {
    const result = await axios.get(url,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: values
      })
      .then((res) => res.data)
      .catch((error) => console.log(error.response));
    console.log(values)
    console.log(result);

    // result.opening_hour = result.opening_hour.slice(0, 5);
    // result.closing_hour = result.closing_hour.slice(0, 5);

    if (typeof (result) !== 'undefined') {
      const jsonResult = JSON.parse(result)
      console.log(typeof (result))
      lat(jsonResult)
      setData(jsonResult);
    }

    else {
      setData([]);
    }
  }

  const geocoder = new google.maps.Geocoder();

  const lat = (result) => {
    for (let i = 0; i < result.length; i++) {
      geocoder.geocode({ 'address': result[i].address }).then((response) => {
        if (response.results[0]) {
          result[i].latitude = response.results[0].geometry.location.lat()
          result[i].longitude = response.results[0].geometry.location.lng()
          setCenter({ lat: result[i].latitude, lng: result[i].longitude })
        }
      })
    };
  }

  const logoKFT = 'https://play-lh.googleusercontent.com/SUl4XjMnZ7AoG394N20DpStiI4e1jynSSVDsh6V6h4PzFBPn8UhZ2Sa9ZybBz5rWwEQ';
  console.log(data)
  return (
    <div>
      <Row>
        <Col span={4} offset={2}>
          <Form
            name='filter-search'
            form={form}
            className='search-form'
            onFinish={onFinish}
          >
            <Form.Item
              name="address"
              label="Address"
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              name="drink_name"
              label="Drink name"
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              name="shop_name"
              label="Shop name"
            >
              <Input allowClear />
            </Form.Item>

            <Form.Item
              name="min_rating"
              label="Minimum rating"
            >
              <Rate allowHalf />
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
            zoom={14}
            center={center}
            mapContainerClassName="map-container"
          >
            {data?.map((shop) => (
              // console.log((shop))
              <Marker
                key={shop.shop_name}
                position={{ lat: shop.latitude, lng: shop.longitude }}
                onClick={() => {
                  setSelectedMarker(shop);
                  setCenter({ lat: shop.latitude, lng: shop.longitude })
                }}
              />
            ))}
            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
                onCloseClick={() => setSelectedMarker('')}
              >
                <div>
                  <Row>
                    <Col>
                      <img src={selectedMarker.image_url} sizes='100px' alt='shop-logo' style={{ width: 80, height: 80 }} />
                    </Col>
                    <Col>
                      <Link to={"/bobashop/" + selectedMarker.id} >
                        <h1>{selectedMarker.shop_name}</h1>
                      </Link>
                      <p>{selectedMarker.address}</p>
                      <p>Hours: {selectedMarker.opening_hour} - {selectedMarker.closing_hour}</p>
                      <p>{selectedMarker.rating}<StarOutlined /></p>
                    </Col>
                  </Row>
                </div>
              </InfoWindow>
              // console.log(selectedMarker.id)
            )}
          </GoogleMap>
        </Col>
      </Row>
    </div>
  )
}

export default Map;
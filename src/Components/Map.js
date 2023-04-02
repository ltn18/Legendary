import React from 'react'
import { Button, Input } from 'antd';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const { Search } = Input;

const onSearch = (value) => console.log(value);
const Map = () => {

  const { isLoaded } = useLoadScript(
    {
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyBxZCkiGPOBS0rtuGSoiXLd-7tAKT94kgw",
      libraries: ['places'],
    }
  );

    if(!isLoaded) return <div>Loading...</div>
    return <MapSearch />
  }

function MapSearch() {
  const center = {lat: 40, lng: -80}

  return (
    <div>
        <Search
        className="map-search-bar"
        placeholder="Search"
        onSearch={onSearch}
        allowClear
        size="large"
        enterButton = {<Button className='map-enter-button' type='primary'> Search </Button>}
        />

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
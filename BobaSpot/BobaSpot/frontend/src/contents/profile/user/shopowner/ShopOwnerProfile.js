import React, { useState, useEffect } from 'react';
import axios from 'axios'

import ShopOwnerInfo from './ShopOwnerInfo';
import ShopPreview from './ShopPreview'

const ShopOwnerProfile = () => {
    // user's shop data
    const [shopData, setShopData] = useState(null);

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        image_url: ''
    });

    const [nullShopData, setNullShopData] = useState();

    // fetch shop data
    useEffect(() => {
        const fetchShopOwner = async () => {
            const resultUserData = await axios.get('http://localhost:8000/api/user/', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                }
            })

            const options = {
                method: 'GET',
                url: `http://localhost:8000/api/bobashop/${resultUserData.data.id}/`,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }

            const resultShopData = await axios.request(options);

            console.log("userData:", resultUserData.data);
            console.log("result shop data:", resultShopData.data);

            setUserData(resultUserData.data);

            if (resultShopData.data) {
                setShopData({
                    id: resultShopData.data.id,
                    logo_url: resultShopData.data.image_url,
                    shop_name: resultShopData.data.shop_name,
                    address: resultShopData.data.address,
                    tel: resultShopData.data.telephone,
                    hours: {
                        start: resultShopData.data.opening_hour,
                        end: resultShopData.data.closing_hour
                    },
                    rating: resultShopData.data.rating
                });
            }
        }

        // console.log("api_key:", process.env.REACT_APP_FIREBASE_API_KEY);

        fetchShopOwner();
    }, []);

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
            }}
        >
            <div style={{ width: '25%' }}>
                <ShopOwnerInfo data={userData} shopData={shopData} />
            </div>
            <div style={{
                width: '75%',
            }}>
                <ShopPreview userData={userData} shopData={shopData} />
            </div>
        </div>
    )
}

export default ShopOwnerProfile;
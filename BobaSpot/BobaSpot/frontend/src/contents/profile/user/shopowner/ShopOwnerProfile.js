import React, { useState, useEffect } from 'react';
import axios from 'axios'

import ShopOwnerInfo from './ShopOwnerInfo';
import ShopPreview from './ShopPreview'

const ShopOwnerProfile = () => {
    // user's shop data
    const [shopData, setShopData] = useState(null);

    const [userData, setUserData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        image_url: ''
    });

    const [nullShopData, setNullShopData] = useState();

    const nullImageUrl = "https://images.dsw.com/is/image/DSWShoes/P212430_blog-list_instores_icon_ux_new.png?impolicy=qlt-medium&imwidth=1011&imdensity=1";

    // fetch shop data
    useEffect(() => {
        const fetchShopOwner = async () => {
            const resultUserData = await axios.get('http://localhost:8000/api/user/', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                }
            })

            console.log("userData:", resultUserData.data);

            const options = {
                method: 'GET',
                url: `http://localhost:8000/api/bobashop/${resultUserData.data.id}/`,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }

            const resultShopData = await axios.request(options)
                .then(res => res)
                .catch(err => console.log(err));

            console.log("result shop data:", resultShopData);

            setUserData({
                id: resultUserData.data.id,
                first_name: resultUserData.data.first_name,
                last_name: resultUserData.data.last_name,
                image_url: resultUserData.data.image_url
            });

            if (resultShopData) {
                setShopData({
                    id: resultShopData.data.id,
                    logo_url: resultShopData.data.image_url
                        ? resultShopData.data.image_url
                        : nullImageUrl,
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
            <div style={{ width: '25%' }}
                data-testid="shopowner-info"
            >
                <ShopOwnerInfo data={userData} shopData={shopData} />
            </div>
            <div style={{
                width: '75%',
            }}
                data-testid="shopowner-preview"
            >
                <ShopPreview userData={userData} shopData={shopData} />
            </div>
        </div>
    )
}

export default ShopOwnerProfile;
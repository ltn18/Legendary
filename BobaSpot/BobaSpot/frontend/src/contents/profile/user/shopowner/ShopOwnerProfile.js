import React, { useState, useEffect } from 'react';
import axios from 'axios'

import ShopOwnerInfo from './ShopOwnerInfo';
import ShopPreview from './ShopPreview'

const ShopOwnerProfile = () => {
    // user's shop data
    const [shopData, setShopData] = useState({
        id: "123",
        logo_url: "https://images.dsw.com/is/image/DSWShoes/P212430_blog-list_instores_icon_ux_new.png?impolicy=qlt-medium&imwidth=1011&imdensity=1",
        shop_name: "Kung Fu Tea",
        address: "11312 Euclid Ave, Cleveland, OH, 44106",
        tel: "2168627690",
        hours: {
            start: "2 AM",
            end: "8 AM"
        },
        rating: "4.5"
    })

    const [nullShopData, setNullShopData] = useState();

    // fetch shop data
    useEffect(() => {
        const fetchShop = async () => {
            const result = await axios.get('http://localhost:8000/api/bobaplace/', {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                }
            })

            setShopData({
                id: "123",
                logo_url: "",
                shop_name: "Kung Fu Tea",
                address: "11312 Euclid Ave, Cleveland, OH, 44106",
                tel: "2168627690",
                hours: {
                    start: "2 AM",
                    end: "8 AM"
                },
                rating: "4.5"
            });
        }

    }, [shopData]);

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
            }}
        >
            <div style={{ width: '25%' }}>
                <ShopOwnerInfo shopData={nullShopData}/>
            </div>
            <div style={{
                width: '75%',
            }}>
                <ShopPreview shopData={shopData}/>
            </div>
        </div>
    )
}

export default ShopOwnerProfile;
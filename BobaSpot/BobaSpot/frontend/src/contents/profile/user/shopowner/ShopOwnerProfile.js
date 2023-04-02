import React, { useState } from 'react';

import ShopOwnerInfo from './ShopOwnerInfo';
import ShopPreview from './ShopPreview'

const ShopOwnerProfile = () => {
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
            }}
        >
            <div style={{ width: '25%' }}>
                <ShopOwnerInfo />
            </div>
            <div style={{
                width: '75%',
            }}>
                <ShopPreview />
            </div>
        </div>
    )
}

export default ShopOwnerProfile;
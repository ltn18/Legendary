import React, { useState } from 'react';
import ShopPreviewCard from './ShopPreviewCard';

const ShopPreview = (props) => {
    const { shopData, userData } = props;

    return (
        <div
            style={{
                background: '#FDD0CF',
                height: '100%',
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <ShopPreviewCard shopData={shopData} data={userData}/>
        </div>
    )
}

export default ShopPreview;
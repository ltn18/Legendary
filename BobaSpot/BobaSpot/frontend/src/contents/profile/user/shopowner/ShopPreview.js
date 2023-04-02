import React, { useState } from 'react';
import ShopPreviewCard from './ShopPreviewCard';

const ShopPreview = () => {
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
            <ShopPreviewCard/>
        </div>
    )
}

export default ShopPreview;
import React, { useState } from 'react';

import UserInfo from './UserInfo';
import UserComments from './UserComments';

const UserProfile = () => {
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
            }}
        >
            <div style={{ width: '25%' }}>
                <UserInfo />
            </div>
            <div style={{
                width: '75%',
            }}>
                <UserComments />
            </div>
        </div>
    )
}

export default UserProfile;
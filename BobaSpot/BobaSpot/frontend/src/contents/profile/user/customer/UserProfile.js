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
            <div
                style={{ width: '30%' }}
                data-testid="user-info"
            >
                <UserInfo />
            </div>
            <div
                style={{
                    width: '70%',
                }}
                data-testid="user-comments"
            >
                <UserComments />
            </div>
        </div>
    )
}

export default UserProfile;
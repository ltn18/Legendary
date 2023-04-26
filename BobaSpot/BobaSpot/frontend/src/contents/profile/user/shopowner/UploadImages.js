import React from 'react';
import { Storage } from '@google-cloud/storage';
import axios from 'axios';

const UploadImages = () => {
    const cloudStorage = new Storage({
        keyFilename: `/service_account_key.json`,
        projectId: "PROJECT_ID",
    });

    
}

export default UploadImages;
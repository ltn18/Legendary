"use strict";

// firebase
// const firebase = require("../firebase");
// const firestore = firebase.firestore();

const uploadImage = async (req, res, next) => {
    try {
        const data = req.body;
        
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    uploadImage
};
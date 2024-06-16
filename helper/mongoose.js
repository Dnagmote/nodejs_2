const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/nodejs_2")
    .then(() => {
        console.log("Mongodb connectedd successfully.");
    })
    .catch((error) => {
        console.log("Mongodb error :--- ", error);
    });

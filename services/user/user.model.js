const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        gender: { type: String, required: true },
        password: { type: String, required: true },
        countryCode: { type: String, default: "+91" },
    },
    { timestamps: true, collection: "user" }
);

const user = mongoose.model("User", userSchema);
module.exports = user;

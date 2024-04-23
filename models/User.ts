const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, lastName: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    }, token: {
        type: String,
        required: true
    }, userAgent: {
        type: String,
        required: true
    }, role: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.models.User || mongoose.model("User", schema);

export default UserModel;
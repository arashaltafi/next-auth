const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,

})

const model = mongoose.models.user || mongoose.model("User", schema);

export default model;
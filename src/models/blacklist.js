const mongoose = require("mongoose");

const model = new mongoose.Schema({
    userId: { type: String , required: true}
}, {collection: 'Blacklists'});

module.exports = mongoose.model("Blacklists", model);
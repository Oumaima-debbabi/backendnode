const mongoose = require("mongoose");
const Schema= mongoose.Schema
const propositionSchema = new Schema({


lieu:String,
description:String,
type:String,
titre:String,
precision:String,
creator:String,
dateCreated: { type: Date, default: Date.now }

});

module.exports = mongoose.model("Proposition", propositionSchema);

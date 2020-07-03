const mongoose = require("mongoose");
const Schema= mongoose.Schema
const propositionSchema = new Schema({


lieu:String,
description:String,
type:String,
titre:String,
precision:String,
creator:{type:Schema.Types.ObjectId,
ref:'User'},
dateCreated: { type: Date, default: Date.now },
etat:String
});

module.exports = mongoose.model("Proposition", propositionSchema);

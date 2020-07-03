const mongoose = require("mongoose");
const Schema= mongoose.Schema
//var Association =require("./Association")

const exprienceSchema = new Schema({

description:{type:String},

creator: { type: Schema.Types.ObjectId, ref: 'User'},

dateCreated: { type: Date, default: Date.now },

});

module.exports = mongoose.model("Experience", exprienceSchema);

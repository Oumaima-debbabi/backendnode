const mongoose = require("mongoose");
const Schema= mongoose.Schema
var User =require("./User")

const adminSchema = User.discriminator("Admin",new Schema({

dateinscription:{type:Date,trim:true,required:false},

role: {
    type: String,
    default: 'admin'
  },
imageUrl:String
}));

module.exports = mongoose.model("Admin");
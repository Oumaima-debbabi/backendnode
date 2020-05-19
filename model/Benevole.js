const mongoose = require("mongoose");
const Schema= mongoose.Schema
var User =require("./User")

const benevoleSchema = User.discriminator("Benevole",new Schema({
association:[{
type:String,
ref:'association'

}],

isVerified: { type: Boolean, default: false },

image:String
}));

module.exports = mongoose.model("Benevole");
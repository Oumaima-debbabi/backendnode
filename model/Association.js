const mongoose = require("mongoose");
const Schema= mongoose.Schema
var User =require("./User")

const associationSchema = User.discriminator("Association",new Schema({
 nombre_membre:Number,
nom_association: String,
adresse_asso: String,
numero_association: String,
code_postal: String,
date_creation: String,
secteur:[{
  type:String,
  ref:'secteur'}
],
isVerified:{type:Boolean,default:false},
image:String
}));

module.exports = mongoose.model("Association");
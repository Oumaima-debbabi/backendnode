const mongoose = require("mongoose");
const Schema= mongoose.Schema
const associationSchema = new Schema({
 
nom_association: String,
email: String,
nom_responsable: String,
adresse: String,
numero_association: String,
code_postal: String,
password: String,
date_creation: String,
secteur:[{
  type:String,
  ref:'secteur'}
],
image:String
});

module.exports = mongoose.model("Association", associationSchema);

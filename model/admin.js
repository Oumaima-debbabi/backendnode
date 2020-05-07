const mongoose = require("mongoose");
const Schema= mongoose.Schema
const adminSchema = new Schema({
 
name: String,
email: String,
prenom: String,
adresse: String,
numero: String,
code_postal: String,
password: String,
date_naissance: String,
image:String
});

module.exports = mongoose.model("Admin", adminSchema);

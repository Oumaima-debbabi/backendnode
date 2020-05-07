const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
statut:String,
civilite: String,
name: String,
email:String,
prenom:String,
adresse: String,
numero_telephone:String,
code_postal:String,
password:String,
annee_naissance:String,
profession:String,
photo:String,

});

module.exports = mongoose.model("User", userSchema);

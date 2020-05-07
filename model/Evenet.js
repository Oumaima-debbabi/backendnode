
const mongoose = require("mongoose");
const Schema= mongoose.Schema
const evenemenetSchema = new Schema({
sujet:String,
nombre_preson:String,
nom_res:String,
lieu:String,
date:String,
contenu:String

});

module.exports = mongoose.model("Evenement", evenemenetSchema);

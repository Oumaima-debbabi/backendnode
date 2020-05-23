const mongoose = require("mongoose");
const Schema= mongoose.Schema
const evenemenetSchema = new Schema({
sujet:String,
nombre_preson:String,
nom_res:String,
lieu:String,
date:String,
contenu:String,
nom_association:String,
dateCreated: { type: Date, default: Date.now },


});

module.exports = mongoose.model("Evenement", evenemenetSchema);
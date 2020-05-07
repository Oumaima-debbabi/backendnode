const mongoose = require("mongoose");
const Schema= mongoose.Schema
const missionSchema = new Schema({
sujet:String,
besoin:String,
nombre_preson:String,
nom_res:String,
lieu:String,
date:String,
datefin:String,
type:String,
Photo:String,
action:String

});

module.exports = mongoose.model("Mission", missionSchema);

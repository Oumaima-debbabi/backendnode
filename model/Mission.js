const mongoose = require("mongoose");
const Schema= mongoose.Schema
//var Association =require("./Association")

const missionSchema = new Schema({
sujet:String,
besoin:String,
nombre_preson:String,
lieu:String,
date:String,
datefin:String,
type:String,
description:String,
qd:String,

imageUrl:String,
dateCreated: { type: Date, default: Date.now },
nom_association1:[{
    type: String,
    ref : 'Association'
}]
});

module.exports = mongoose.model("Mission", missionSchema);

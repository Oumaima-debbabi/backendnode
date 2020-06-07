const Mongoose = require("mongoose");
const Schema= Mongoose.Schema
var User =require("./User")
var Secteur =require("./Secteur")

const associationSchema = User.discriminator("Association",new Schema({
 nombre_membre:Number,
nom_association: String,
adresse_asso: String,
numero_association: String,
code_postal: String,
date_creation: String,
email:String,
secteur:[{
    type:Schema.Types.ObjectId,
    ref:'Secteur'
}],


isVerified:{type:Boolean,default:false},
imageUrl:String,
couverture:String,
lien:String,

}),
{collection:'associations'}
);

module.exports = Mongoose.model("Association");
const mongoose = require("mongoose");
const Schema= mongoose.Schema
var User =require("./User")

const benevoleSchema = User.discriminator("Benevole",new Schema({
association:{
  type:Schema.Types.ObjectId,
  ref : 'Association'
},

isVerified: { type: Boolean, default: false },
role: {
    type: String,
    default: 'benevole'
  },
imageUrl:String,
missions:{type:[]}

}));

module.exports = mongoose.model("Benevole");
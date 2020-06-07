
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const partenaireSchema = new mongoose.Schema({
	nom: {
		type: String,
		trim: true,		
		required: true,
    },
  imageUrl:{
        type:String,
         trim:true,
         required:true,
    },
    dateCreated: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Partenaire', partenaireSchema)
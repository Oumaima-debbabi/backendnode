
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const partenaireSchema = new mongoose.Schema({
	nom: {
		type: String,
		trim: true,		
		required: true,
    },
  Photo:{
        type:String,
         trim:true,
         required:true,
    }

});

module.exports = mongoose.model('Partenaire', partenaireSchema)

const mongoose = require('mongoose');


//Define a schema
const Schema = mongoose.Schema;
const secteurSchema = new mongoose.Schema({
	type_activite: {
		type: String,
		trim: true,		
		required: true,
	},
	dateCreated: { type: Date, default: Date.now },
//assoications: [{ type: Schema.Types.ObjectId, ref: "Association" }],

});

module.exports = mongoose.model('Secteur', secteurSchema)
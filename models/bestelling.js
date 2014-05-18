var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Bestelling = new Schema({
	orderid: String,
	datum: String,
	tijd: String,
	tafelnummer: Number,
	bestelling: Object	
},{collection: 'orders'});

var BestellingLijst = mongoose.model('BestellingLijst', Bestelling);
module.exports = { BestellingLijst: BestellingLijst};
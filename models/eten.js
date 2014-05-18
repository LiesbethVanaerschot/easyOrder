
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Eten = new Schema({
	_id: String,
	cat: String
},{collection:'eten'});

var Ontbijt = new Schema({
	_id: String,
	eten_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'ontbijt'});

var Bagels = new Schema({
	_id: String,
	eten_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'bagels'});

var Wraps = new Schema({
	_id: String,
	eten_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'wraps'});

var Soep = new Schema({
	_id: String,
	eten_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'soep'});

var Yoghurt = new Schema({
	_id: String,
	eten_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'yoghurt'});

var EtenLijst = mongoose.model('EtenLijst', Eten);
var OntbijtLijst = mongoose.model('OntbijtLijst', Ontbijt);
var BagelsLijst = mongoose.model('BagelsLijst', Bagels);
var WrapsLijst = mongoose.model('WrapsLijst', Wraps);
var SoepLijst = mongoose.model('SoepLijst', Soep);
var YoghurtLijst = mongoose.model('YoghurtLijst', Yoghurt);

module.exports = {	EtenLijst: EtenLijst,
					OntbijtLijst: OntbijtLijst,
					BagelsLijst: BagelsLijst,
					WrapsLijst: WrapsLijst,
					SoepLijst: SoepLijst,
					YoghurtLijst: YoghurtLijst};



//http://stackoverflow.com/questions/19886736/how-to-find-documents-with-nodejs-and-mongoose-why-there-is-no-result
//http://www.tutorialindustry.com/node-js-mongodb-tutorial-for-beginners

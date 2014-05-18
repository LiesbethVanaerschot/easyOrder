var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Drinken = new Schema({
	_id: String,
	cat: String
},{collection:'drinken'});

var Koffie = new Schema({
	_id: String,
	drink_id: String,
	naam: String
},{collection:'koffie'});

var Zwart = new Schema({
	_id: String,
	koffie_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'zwart'});

var metMelk = new Schema({
	_id: String,
	koffie_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'metmelk'});

var Specials = new Schema({
	_id: String,
	koffie_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'specials'});

var Thee = new Schema({
	_id: String,
	drink_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'thee'});

var Melk = new Schema({
	_id: String,
	drink_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'melk'});

var Sappen = new Schema({
	_id: String,
	drink_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'sappen'});

var Frisdrank = new Schema({
	_id: String,
	drink_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'frisdrank'});

var Alcohol = new Schema({
	_id: String,
	drink_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'alcohol'});

var Ijskoffie = new Schema({
	_id: String,
	drink_id: String,
	naam: String,
	prijs: Number,
	omschrijving: String
},{collection: 'ijskoffie'});

var DrinkenLijst = mongoose.model('DrinkenLijst', Drinken);
var KoffieLijst = mongoose.model('KoffieLijst', Koffie);
var ZwartLijst = mongoose.model('ZwartLijst', Zwart);
var metMelkLijst = mongoose.model('metMelkLijst', metMelk);
var SpecialsLijst = mongoose.model('SpecialsLijst', Specials);
var TheeLijst = mongoose.model('TheeLijst', Thee);
var MelkLijst = mongoose.model('MelkLijst', Melk);
var SappenLijst = mongoose.model('SappenLijst', Sappen);
var FrisdrankLijst = mongoose.model('FrisdrankLijst', Frisdrank);
var AlcoholLijst = mongoose.model('AlcoholLijst', Alcohol);
var IjskoffieLijst = mongoose.model('IjskoffieLijst', Ijskoffie);

module.exports = { DrinkenLijst: DrinkenLijst,
				   KoffieLijst: KoffieLijst,
				   ZwartLijst: ZwartLijst,
				   metMelkLijst: metMelkLijst,
				   SpecialsLijst: SpecialsLijst,
				   TheeLijst: TheeLijst,
				   MelkLijst: MelkLijst,
				   SappenLijst: SappenLijst,
				   FrisdrankLijst: FrisdrankLijst,
				   AlcoholLijst: AlcoholLijst,
				   IjskoffieLijst: IjskoffieLijst};

/*
 * GET home page.
 */
var async = require('async');

exports.index = function(req, res, next){
	var Eten = {};
		Ontbijt = {};
		Bagels = {};
		Wraps = {};
		Soep = {};
		Yoghurt = {};
		Drinken = {}	
		Koffie = {};
		Zwart = {};
		metMelk = {};
		Specials = {};
		Thee = {};
		Melk= {};
		Sappen= {};
		Frisdrank= {};
		Alcohol= {};
		Ijskoffie= {};

	var EtenLijst = require("../models/eten").EtenLijst;
	var OntbijtLijst = require("../models/eten").OntbijtLijst;
	var BagelsLijst = require("../models/eten").BagelsLijst;
	var WrapsLijst = require("../models/eten").WrapsLijst;
	var SoepLijst = require("../models/eten").SoepLijst;
	var YoghurtLijst = require("../models/eten").YoghurtLijst;
	var DrinkenLijst = require("../models/drinken").DrinkenLijst;
	var KoffieLijst = require("../models/drinken").KoffieLijst;
	var ZwartLijst = require("../models/drinken").ZwartLijst;
	var metMelkLijst = require("../models/drinken").metMelkLijst;
	var SpecialsLijst = require("../models/drinken").SpecialsLijst;
	var TheeLijst = require("../models/drinken").TheeLijst;
	var MelkLijst = require("../models/drinken").MelkLijst;
	var SappenLijst = require("../models/drinken").SappenLijst;
	var FrisdrankLijst = require("../models/drinken").FrisdrankLijst;
	var AlcoholLijst = require("../models/drinken").AlcoholLijst;
	var IjskoffieLijst = require("../models/drinken").IjskoffieLijst;

	async.parallel([

			function(callback){
				EtenLijst.find({}, function(err,eten){
					if(err)
					{
						return callback(err);
					}
					//console.log(eten);
					Eten = eten;
					//console.log(Eten);
					callback();
				});
			},
			function(callback){
				OntbijtLijst.find({}, function(err,ontbijt){
					if(err)
					{
						return callback(err);
					}
					//console.log(eten);
					Ontbijt = ontbijt;
					//console.log(Eten);
					callback();
				});
			},
			function(callback){
				BagelsLijst.find({}, function(err,bagels){
					if(err)
					{
						return callback(err);
					}
					//console.log(eten);
					Bagels = bagels;
					//console.log(Eten);
					callback();
				});
			},
			function(callback){
				WrapsLijst.find({}, function(err,wraps){
					if(err)
					{
						return callback(err);
					}
					//console.log(eten);
					Wraps = wraps;
					//console.log(Eten);
					callback();
				});
			},
			function(callback){
				SoepLijst.find({}, function(err,soep){
					if(err)
					{
						return callback(err);
					}
					//console.log(eten);
					Soep = soep;
					//console.log(Eten);
					callback();
				});
			},
			function(callback){
				YoghurtLijst.find({}, function(err,yoghurt){
					if(err)
					{
						return callback(err);
					}
					//console.log(eten);
					Yoghurt = yoghurt;
					//console.log(Eten);
					callback();
				});
			},
			function(callback){
				DrinkenLijst.find({}, function(err,drinken){
					if(err)
					{
						return callback(err);
					}
					//console.log(drinken);
					Drinken = drinken;
					//console.log(Drinken);
					callback();
				});
			},
			function(callback){
				KoffieLijst.find({}, function(err,koffie){
					if(err)
					{
						return callback(err);
					}
					//console.log(koffie);
					Koffie = koffie;
					//console.log(Koffie);
					callback();
				});
			},
			function(callback){
				ZwartLijst.find({}, function(err,zwart){
					if(err)
					{
						return callback(err);
					}
					//console.log(koffie);
					Zwart = zwart;
					//console.log(Koffie);
					callback();
				});
			},
			function(callback){
				metMelkLijst.find({}, function(err,metmelk){
					if(err)
					{
						return callback(err);
					}
					//console.log(koffie);
					metMelk = metmelk;
					//console.log(Koffie);
					callback();
				});
			},
			function(callback){
				SpecialsLijst.find({}, function(err,specials){
					if(err)
					{
						return callback(err);
					}
					//console.log(koffie);
					Specials = specials;
					//console.log(Koffie);
					callback();
				});
			},
			function(callback){
				TheeLijst.find({}, function(err,thee){
					if(err)
					{
						return callback(err);
					}
					//console.log(koffie);
					Thee = thee;
					//console.log(Koffie);
					callback();
				});
			},
			function(callback){
				MelkLijst.find({}, function(err,melk){
					if(err)
					{
						return callback(err);
					}
					//console.log(koffie);
					Melk = melk;
					//console.log(Koffie);
					callback();
				});
			},
			function(callback){
				SappenLijst.find({}, function(err,sappen){
					if(err)
					{
						return callback(err);
					}
					//console.log(koffie);
					Sappen = sappen;
					//console.log(Koffie);
					callback();
				});
			},
			function(callback){
				FrisdrankLijst.find({}, function(err,frisdrank){
					if(err)
					{
						return callback(err);
					}
					//console.log(koffie);
					Frisdrank = frisdrank;
					//console.log(Koffie);
					callback();
				});
			},
			function(callback){
				AlcoholLijst.find({}, function(err,alcohol){
					if(err)
					{
						return callback(err);
					}
					//console.log(koffie);
					Alcohol = alcohol;
					//console.log(Koffie);
					callback();
				});
			},
			function(callback){
				IjskoffieLijst.find({}, function(err,ijskoffie){
					if(err)
					{
						return callback(err);
					}
					//console.log(koffie);
					Ijskoffie = ijskoffie;
					//console.log(Koffie);
					callback();
				});
			}
		],
		function(err)
		{
			if(err){
				return next(err);
			}
			//console.log(Eten);
			//console.log(Drinken);
			//onsole.log(Thee);
			res.render('index', {title: "Beans Bar",
								Eten: Eten,
								Ontbijt: Ontbijt,
								Bagels: Bagels,
								Wraps: Wraps,
								Soep: Soep,
								Yoghurt: Yoghurt, 
								Drinken: Drinken, 
								Koffie: Koffie, 
								Zwart: Zwart, 
								metMelk: metMelk, 
								Specials: Specials, 
								Thee: Thee,
								Melk: Melk,
								Sappen: Sappen,
								Frisdrank: Frisdrank,
								Alcohol: Alcohol,
								Ijskoffie: Ijskoffie});
		});
	/*console.log(res);
	var EtenLijst = require("../models/eten").EtenLijst;
	EtenLijst.find({}, function(err, eten){
		console.log(eten);
	res.render('index', {title: "Beans Bar Menu", food: eten});
	});*/

};

exports.order = function(req, res){	
  var BestellingLijst = require("../models/bestelling").BestellingLijst;
  BestellingLijst.find({}, function(err, bestellingen){
  		res.render('order', { title: 'Orders', bestellingen: bestellingen});
  });	
  
};

exports.feedback = function(req, res){	
  res.render('feedback', { 
  	title: 'Feedback',
  	 });
};

exports.login = function(req, res){	
  res.render('admin', { 
  	title: 'Admin Login',
  	 });
};

//http://stackoverflow.com/questions/18008479/node-js-wait-for-multiple-async-calls
//http://mherman.org/blog/2013/11/11/user-authentication-with-passport-dot-js/#.U1gM4Pl_tqU
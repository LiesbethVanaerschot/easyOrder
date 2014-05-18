
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var async = require('async');
var faye = require('faye');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');


mongoose.connect('mongodb://lies:lies0103@oceanic.mongohq.com:10000/beans');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:connection to db has failed'));
db.once('open',function callback(){
	console.log('Connection with db has been succesful!');
});

//MONGOOSE MODELS
//var food = db.model('EtenLijst', require('./models/eten').EtenLijst);
var eten = require('./models/eten');
//console.log(typeof eten.EtenLijst);
var drinken = require('./models/drinken');
var bestellingen = require('./models/bestelling');
//mongoose bestelling schema en model
var Bestelling =  new mongoose.Schema({
	orderid: String,
	datum: String,
	tijd: String,
	tafelnummer: Number,
	bestelling: Object
});

var order = mongoose.model('orders', Bestelling);

//mongoose admin schema en model
var Admin = new mongoose.Schema({
	naam: String,
	paswoord: String
},{collection: 'admin'});

Admin.methods.validPassword = function(pwd)
{
	if(this.paswoord === pwd)
	{
		return true;
	}
	else
	{
		return false;
	}
};

var AdminModel = mongoose.model('admin', Admin);

//
var app = express();

passport.use(new LocalStrategy(
	function(username,password,done){
		AdminModel.findOne({naam: username}, function(err,user){
			console.log(user);
			var pass= user.paswoord;
			if(err)
			{
				return done(err);
			}
			if(!user)
			{
				return done(null, false, { message: 'Login naam is incorrect!'});
			}
			if(!user.validPassword(password))
			{
				return done(null,false, {message: 'Geef het juiste paswoord in!'})
			}

			return done(null, user);

		})
	}
	));

passport.serializeUser(function(user, done) {
        done(null, user.naam);
    });

passport.deserializeUser(function(naam, done) {
        done(null, {username: naam});
    });

// all environments
app.configure(function(){
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.bodyParser());
app.use(express.session({secret: 'my secret'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
});


//functies
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/admin');
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//APP GET GEDEELTE

app.get('/', routes.index);
//ADMIN SUCCESVOL AANMELDEN
app.post('/login',
	passport.authenticate('local', {failureRedirect: '/admin',
									failureFlash: true}),
	function(req, res){res.redirect('/order')}
	);
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/admin');
});

app.get('/order', routes.order);
app.get('/feedback', routes.feedback);
app.get('/admin', routes.login);
//app.get('/', ensureAuthenticated, routes.login);
app.get('/users', user.list);

//BESTELLING OPSLAAN AJAX APP.POST
//SAVEN IN TBLORDERS

app.post('/order', function(req, res){
	var obj = {};
	console.log(req.body.order);

	var id = req.body.id;
	var bestelling = req.body.order;
	var tafelnummer = req.body.tafelnummer;
	var datum = req.body.datum;
	var tijd = req.body.tijd;
	//https://www.youtube.com/watch?v=uZqwHfNIf8M
	new order({
		orderid: id,
		datum: datum,
		tijd: tijd,
		tafelnummer: tafelnummer,
		bestelling: bestelling
	}).save(function(err, doc){
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log('succesful!');
		}
	order.count(function(err,c){
				console.log('count is ' + c);
				res.json(c);
			});	
	});

});

//tellen hoeveel docs in collection zitten.
//http://mongoosejs.com/docs/api.html#model_Model.count

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

bayeux.attach(server);
server.listen(5000);


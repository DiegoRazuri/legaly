'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FacebookStrategy = require('passport-facebook').Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		return done(null, user);
	});
	passport.deserializeUser(function (user, done) {
		//obtengo el usuario de la base de datos con el id
		done(null, user);
	});

	passport.use(new FacebookStrategy({
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: process.env.FACEBOOK_CALLBACK_URI || 'http://localhost:3000/auth/facebook/callback',
		profileFields: ['id', 'first_name', 'email', 'last_name', 'picture.type(large)']
	}, function (token, refreshToken, profile, done) {

		// QUERY APLICANDO POPULATE


		_userprofiles2.default.findOne({ username: profile.id }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (user) {
				user.photo = profile.photos[0].value;
				user.save(function (err) {
					if (err) throw err;
					return done(null, user);
				});
				//return done(null, user)
			} else {
				var _user = new _userprofiles2.default();

				_user.provider = profile.provider;
				_user.photo = profile.photos[0].value;
				_user.lastname = profile.name.familyName;
				_user.name = profile.name.givenName;
				_user.username = profile.id;
				_user.profile_provider_link = profile.profileUrl;
				//user.location = profile._json.location.name;


				_user.save(function (err) {
					if (err) throw err;
					return done(null, _user);
				});
			}
		});
	}));

	passport.use(new LinkedInStrategy({
		consumerKey: process.env.LINKEDIN_API_KEY,
		consumerSecret: process.env.LINKEDIN_SECRET_KEY,
		//callbackURL: 'http://localhost:3000/auth/linkedin/callback',
		callbackURL: process.env.LINKEDIN_CALLBACK_URI || 'http://localhost:3000/auth/linkedin/callback',
		profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline', 'picture-url']
	}, function (token, tokenSecret, profile, done) {
		//logica si el usuario es nuevo o no, si se le va a registrar, etc.
		//pasamos el metodo done y el usuario ya esta autenticado.
		_userprofiles2.default.findOne({ username: profile.id }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (user) {
				return done(null, user);
			} else {
				var _user2 = new _userprofiles2.default();

				_user2.provider = profile.provider;
				_user2.position = profile._json.headline;
				_user2.photo = profile._json.pictureUrl;
				_user2.lastname = profile.name.familyName;
				_user2.name = profile.name.givenName;
				_user2.username = profile.id;

				_user2.save(function (err) {
					if (err) throw err;
					return done(null, _user2);
				});
			}
		});
	}));

	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK_URI || "http://localhost:3000/auth/google/callback"

	}, function (accessToken, refreshToken, profile, done) {

		console.log(profile);

		_userprofiles2.default.findOne({ username: profile.id }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (user) {

				return done(null, user);
			} else {
				var _user3 = new _userprofiles2.default();

				_user3.provider = profile.provider;
				_user3.photo = profile.photos[0].value;
				_user3.lastname = profile.name.familyName;
				_user3.name = profile.displayName;
				_user3.username = profile.id;
				_user3.profile_provider_link = profile.url;
				_user3.email = profile.emails[0].value;

				_user3.save(function (err) {
					if (err) throw err;
					return done(null, _user3);
				});
			}
		});
	}));

	passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, function (req, email, password, done) {
		_userprofiles2.default.findOne({ email: username }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}
			if (user.password != password) {
				return done(null, false);
			}

			return done(null, user);

			if (err) {
				return done(err);
			} else if (user.password != password) {
				return done(null, false);
			} else if (user) {
				return done(null, user);
			} else {

				console.log(req.user);

				user.provider = "local";
				user.lastname = req.user.lastname;
				user.name = req.user.name + " " + req.user.lastname;
				user.email = email;
				user.password = req.user.email;
			}
		});
	}));
};
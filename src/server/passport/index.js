import mongoose from 'mongoose'
import Userprofiles from 'src/server/models/userprofiles'
import passwordHash from 'password-hash'
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (passport){

	passport.serializeUser((user, done) => done(null, user))
	passport.deserializeUser((user, done)=> {
	//obtengo el usuario de la base de datos con el id
		done(null, user)
	})


	passport.use(new FacebookStrategy({
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		//callbackURL: process.env.FACEBOOK_CALLBACK_URI || 'https://legaly.pe/auth/facebook/callback',
		callbackURL: process.env.FACEBOOK_CALLBACK_URI || 'http://localhost:3000/auth/facebook/callback',
		profileFields: ['id', 'first_name', 'email', 'last_name', 'picture.type(large)']
		//profileFields: ['id', 'first_name', 'email', 'last_name', 'link', 'locale', 'location', 'picture.type(large)']
	}, (token, refreshToken, profile, done)=> {

		// QUERY APLICANDO POPULATE

	


		Userprofiles.findOne({ username: profile.id }, function (err, user) {
			if(err){
				return done(err);
			}
			if(user){
				user.photo = profile.photos[0].value;
				user.save(function(err){
					if(err)
						throw err;
	      			return done(null, user);
				})
				//return done(null, user)
			}else{
				let user = new Userprofiles()
				

				user.provider = profile.provider;
				user.photo = profile.photos[0].value;
				user.lastname = profile.name.familyName;
				user.name = profile.name.givenName;
				user.username = profile.id;
				user.profile_provider_link = profile.profileUrl;
				//user.location = profile._json.location.name;

		

				user.save(function(err){
					if(err)
						throw err;
	      			return done(null, user);
				})
			}
	    });	 
	}))

	passport.use(new LinkedInStrategy({
		consumerKey: process.env.LINKEDIN_API_KEY,
		consumerSecret: process.env.LINKEDIN_SECRET_KEY,
		//callbackURL: 'http://localhost:3000/auth/linkedin/callback',
		callbackURL: process.env.LINKEDIN_CALLBACK_URI || 'https://legaly.pe/auth/linkedin/callback',
		profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline', 'picture-url']
	}, (token, tokenSecret, profile, done)=> {
		//logica si el usuario es nuevo o no, si se le va a registrar, etc.
		//pasamos el metodo done y el usuario ya esta autenticado.
		Userprofiles.findOne({ username: profile.id }, function (err, user) {
			if(err){
				return done(err);
			}
			if(user){
				return done(null, user)
			}else{
				let user = new Userprofiles()

				user.provider = profile.provider;
				user.position = profile._json.headline;
				user.photo = profile._json.pictureUrl;
				user.lastname = profile.name.familyName;
				user.name = profile.name.givenName;
				user.username = profile.id;

				user.save(function(err){
					if(err)
						throw err;
	      			return done(null, user);
				})
			}
	    });

	}))

	passport.use(new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK_URI || "https://legaly.pe/auth/google/callback"

	}, (accessToken, refreshToken, profile, done) =>{

		console.log(profile);

		Userprofiles.findOne({ username: profile.id }, function (err, user) {
			if(err){
				return done(err);
			}
			if(user){
				
				return done(null, user)
			}else{
				let user = new Userprofiles()
				

				user.provider = profile.provider;
				user.photo = profile.photos[0].value;
				user.lastname = profile.name.familyName;
				user.name = profile.displayName;
				user.username = profile.id;
				user.profile_provider_link = profile.url;
				user.email = profile.emails[0].value;

		

				user.save(function(err){
					if(err)
						throw err;
	      			return done(null, user);
				})
			}
	    });

	}))

	passport.use(new LocalStrategy(
		{
			usernameField : 'email',
			passReqToCallback: true
		},
		function(req, username, password, done){
			Userprofiles.findOne({ email : username }, function(err, user) {
				if(err) { return done(err); }
				if(user) {
					if(passwordHash.verify(password, user.password)) { return done(null, user); }
					else { return done(null, false); }
				} else{
					let user = new Userprofiles()
					user.provider = 'local'
					user.name = req.body.name
					user.email = username
					user.password = passwordHash.generate(password)
					user.save(function(err){
						if(err) { throw err; }
						return done(null, user);
					})
				}
			})
		}
	));

}
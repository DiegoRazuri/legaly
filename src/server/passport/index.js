import mongoose from 'mongoose'
import Userprofiles from 'src/server/models/userprofiles'
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin').Strategy;


module.exports = function (passport){

	passport.serializeUser((user, done) => done(null, user))
	passport.deserializeUser((user, done)=> {
	//obtengo el usuario de la base de datos con el id
		done(null, user)
	})


	passport.use(new FacebookStrategy({
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_APP_SECRET,
		callbackURL: process.env.FACEBOOK_CALLBACK_URI || 'http://localhost:3000/auth/facebook/callback',
		profileFields: ['id', 'first_name', 'email', 'last_name', 'link', 'locale', 'location', 'picture.type(large)']
	}, (token, refreshToken, profile, done)=> {

		// QUERY APLICANDO POPULATE

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
		callbackURL: process.env.LINKEDIN_CALLBACK_URI || 'http://localhost:3000/auth/linkedin/callback',
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



// ESTE QUERY ES APLICANDO POPULATE PARA OBTENER EL LUGAR DE TRABAJO
/*
		Userprofiles.
			findOne({ username: profile.id }).
			populate({ 
				path : 'workplaces',
				populate : { path : 'enterprise' }
			}).
			exec( function (err, user ) {
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
*/
	}))


}
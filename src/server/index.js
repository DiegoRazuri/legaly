import http from 'http'
import https from 'https'
import mongoose from 'mongoose'
import express from 'express'
import expressSession from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import api from 'src/server/api'
import history from 'connect-history-api-fallback'
import sslRedirect from 'heroku-ssl-redirect'

//configuracion de session con Redis
const RedisStore = require('connect-redis')(expressSession);
var redis = require('redis').createClient(process.env.REDIS_URL);

//configuracion de autenticacion con passport

const passport = require('passport');
				 require('src/server/passport')(passport);


//configuracion de server

const app = express()

app.use(sslRedirect());

// Esto permite las peticiones desde otro origen

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = http.createServer(app)


//conexion a base de datos

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/legaly', function(err, res){
	if(err) throw err;
	console.log("conectado con éxito a la base de datos");
})


//Configuracion para obtener datos mediante post con body-parser
//antes de configurar los archivos estaticos se indica los parsers

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json());


//sesiones de express

var sessionKey = process.env.SESSION_KEY;

app.use(expressSession({
	// el campo de store debe ser comentado cuando se trabaja en local
	store : new RedisStore({ host: 'localhost', port: 6379, client: redis}),
	secret: sessionKey,
	resave : false,
	saveUninitialized: false
}))



//configuracion de passport

app.use(passport.initialize())
app.use(passport.session())


//configuracion de endpoints

app.use('/api', api)


//configuracion de passport callbacks

app.get('/auth/facebook', passport.authenticate('facebook',{scope : ['public_profile', 'user_location']}))
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
	successRedirect : '/informacion-empresa',
	failureRedirect : '/'
}));

app.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }))
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
//	successRedirect : '/welcome',
	successRedirect : '/informacion-empresa',
	failureRedirect : '/'
}))


app.get('/auth/google', passport.authenticate('google', { scope: ['email profile'] }));
app.get('/auth/google/callback', passport.authenticate('google', { 
	successRedirect : '/informacion-empresa',
	failureRedirect: '/' 

}), function(req, res){
	res.redirect('/');
});

app.post('/login',
	passport.authenticate('local', {
		successRedirect : '/informacion-empresa',
		failureRedirect: '/'
	}),
	function(req, res){
		res.redirect('/');
	});

app.get('/logout', (req, res) =>{
	req.logout()
	res.redirect('/')
})


//configuracion de ruteo ---> IMPORTANTE: Que la instrucción este posicionada antes del middleware de los archivos estaticos

app.use(history());

/*
app.get('*', function (req, res){
	res.sendFile(path.resolve(__dirname, '../../public', 'index.html'))

})
*/


//configuracion de archivos estaticos

app.use(express.static('public'))


//levantamiento de servidor
server.listen(process.env.PORT || 3000, () => console.log("servidor iniciado"))


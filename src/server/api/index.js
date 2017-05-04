
import bodyParser from 'body-parser'
import express from 'express'
import multer from 'multer'
import Userprofiles from 'src/server/models/userprofiles'
import Enterprise from 'src/server/models/enterprises'
import Partners from 'src/server/models/partners'

//configuracion para el router
const router = express.Router();
//configuracion para el bodyparser
const jsonParser = bodyParser.json()

//SE CAMBIO A TRUE PERO YA FUNCIONABA EN FALSE
const urlencodedParser = bodyParser.urlencoded({ extended: true })

//Variables setting
let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

// ENDPOINTS //

router.get('/usersession', function ( req, res ){

	//console.log(req.session.passport.user)


	if(!req.user){
		res.json({user:false})
	}else{
	
		res.json(req.user);

	}

});

router.post('/enterprise_information', jsonParser, function (req, res){
	if (!req.body) return res.sendStatus(400)

		let data = req.body;

		

		let enterprise = new Enterprise()

		//creacion de empresa

		enterprise.optionNames = data.names;
		enterprise.industry = data.enterpriseIndustry;
		enterprise.isItMoneyCapital = data.money_investment;
		enterprise.isItGoodsCapital = data.goods_investment;
		enterprise.totalCapital = data.total_capital;
		enterprise.accountManager = req.user;

		enterprise.save(function(err){
			if(err){
				res.sendStatus(500).json(err)
			}else{

				console.log(enterprise)

				Userprofiles.
					findById(req.user._id).
					exec(function(err, user){
						if (err) throw err;

						user.enterprise.push(enterprise._id);

						user.save(function(err){
							if(err){
								res.sendStatus(500).json(err)
							}else{

								console.log(user)

								let json = {
									enterprise : enterprise,
									user : user
								}

								res.json(json)

							}
						})
					});

			}
		})

		





		//relacionar empresa a usuario
		






});

export default router
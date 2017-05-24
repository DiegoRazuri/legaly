
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

		console.log("se ejecuta query")
	
		Userprofiles.findById(req.user._id).
			populate({
				path : 'enterprise'
			}).
			exec(function(err, user){
				if(err) {
					return res.sendStatus(500).json(err)
				}

				let options = {
					path : 'enterprise.partners',
					model : 'Partners'
				}

				Partners.populate(user, options, function(err, partners){
					if (err) throw err;

					let options = {
						path : 'enterprise.partners.user',
						model : 'Userprofiles'
					}

					Userprofiles.populate(partners, options, function(err, result){
						if(err){
							throw err;
						}else{

							//console.log(result)
							res.json(result);
						}
							
					});
					
				})
			})
		

	}

});

//ENDPOINT update 1 y 2
router.post('/enterprise_information_update', jsonParser, function (req, res){
	if (!req.body) return res.sendStatus(400)

		let data = req.body;
		console.log("enterprise_information_update")
		console.log(data)

		Enterprise.findById(data._id).
			populate({
				path: 'partners'
			}).
			exec(function(err,enterprise){

				if(err) {return res.sendStatus(500).json(err)}

				let options = {
					path : 'partners.user',
					model : 'Userprofiles'
				}

				Userprofiles.populate(enterprise, options, function(err, enterprise_info){
					if (err) throw err;
					console.log("ultimo populate")
					console.log(data.industry)
					console.log(enterprise_info)


					enterprise_info.industry = data.industry;
					enterprise_info.isItGoodsCapital = data.isItGoodsCapital;
					enterprise_info.isItMoneyCapital = data.isItMoneyCapital;
					enterprise_info.optionNames = data.optionNames;
					
					enterprise_info.societyType = data.societyType;
					enterprise_info.totalCapital = data.totalCapital;

					enterprise_info.save(function(err){
						if(err){
							res.sendStatus(500).json(err)
						}else{
							
							
						
							res.json(enterprise_info)
							
						}
					})
/*					
					// iterar sobre los partners comprobar si ya existe y si es nuevo crear uno si no tiene id

					for(let i = 0; i < enterprise_info.partners.length; i++){

						let partnerDB_id = enterprise_info.partners[i]
						for(let i = 0; i < data.partners.length; i++){
							if(data.partners[i]._id == partnerDB){
								partnerDB.position == data.partners[i].position;
								partnerDB.save()
							}else{

								let partner = new Partners()
							
								let user = new Userprofiles()

								user.name = data.partners[i].user.name;
								

								user.save();

								partner.user = user._id;
								partner.position = data.partners[i].position;

								partner.save()

								enterprise_info.partners.push(partner);
							}
						}
					}
*/
					

				});
			});
});

//ENDPOINT 4to paso
router.post('/signing_date_information', jsonParser, function (req, res){
	if (!req.body) return res.sendStatus(400)

		let data = req.body;

		Enterprise.findById(data._id).
			populate({
				path:'partners'
			}).
			exec(function( err, enterprise ){

				if(err) {return res.sendStatus(500).json(err)}

					enterprise.signAppointmentDate = data.signAppointmentDate;
					enterprise.signAppointmentTime = data.signAppointmentTime;
					enterprise.signAppointmentLocation = data.signAppointmentLocation;

					let base = 650;

					let num_positions = 0

					let vPartners = 0;
				
					for(let i=0; i<enterprise.partners.length; i++){
						
						if(enterprise.partners[i].position != '' && enterprise.partners[i].position != "Ninguno"){
				
							num_positions = num_positions + 1;
						}
					}

					if(num_positions > 1){

						let num = num_positions - 1;

						vPartners = num * 40;	

					}else{

						vPartners = 0;

					}

					let vBCapital

					if(enterprise.totalCapital > 5000){

						vBCapital = enterprise.totalCapital/5000;

					}else{
						vBCapital = 0;
					}

					

					let vCapital= vBCapital*30


					let price = vPartners + vCapital + base

					enterprise.price = price;

					enterprise.save(function(err){
						if(err){
							res.sendStatus(500).json(err)
						}
						
						// aca se debe hacer el calculo de cuanto va a costar el servicio
						// y hay q grabarlo en la base de datos y devolver esa información
						res.json(enterprise)
					})
			})
		
});


//ENDPOINT 3er paso

router.post('/partners_information', jsonParser, function (req, res){
	if (!req.body) return res.sendStatus(400)

		let data = req.body;

		let partnersJsonData = data.partners;

		Enterprise.findById(data._id).
			populate({
				path : 'partners'
			}).
			exec(function(err,enterprise){

				if(err) {return res.sendStatus(500).json(err)}

				let options = {
					path : 'partners.user',
					model : 'Userprofiles'
				}
				Userprofiles.populate(enterprise, options, function(err, resultQueryEnterprise){
					if (err) throw err;
					
					resultQueryEnterprise.partners.map((partner)=>{

						let partnerId = partner._id;

						for(let i = 0; i < partnersJsonData.length; i++){
							
							if(partnerId == partnersJsonData[i]._id){

								if(partnersJsonData[i].moneyInput){
									partner.moneyInput = partnersJsonData[i].moneyInput;
								}
								if(partnersJsonData[i].goodsInput){
									partner.goodsInput = partnersJsonData[i].goodsInput;
								}

								partner.save(function(err){
									if(err)
										res.sendStatus(500).json(err)

									let user = partner.user;

									if(partnersJsonData[i].user.name){
										user.name = partnersJsonData[i].user.name;
									}
									if(partnersJsonData[i].user.documentType){
										user.documentType = partnersJsonData[i].user.documentType;
									}
									if(partnersJsonData[i].user.documentNumber){
										user.documentNumber = partnersJsonData[i].user.documentNumber;
									}
									if(partnersJsonData[i].user.email){
										user.email = partnersJsonData[i].user.email;
									}
									if(partnersJsonData[i].user.location){
										user.location = partnersJsonData[i].user.location;
									}
									if(partnersJsonData[i].user.civilStatus){
										user.civilStatus = partnersJsonData[i].user.civilStatus;
									}
									if(partnersJsonData[i].user.coupleDocumentType){
										user.coupleDocumentType = partnersJsonData[i].user.coupleDocumentType;
									}
									if(partnersJsonData[i].user.coupleDocumentNumber){
										user.coupleDocumentNumber = partnersJsonData[i].user.coupleDocumentNumber;
									}

									user.save(function(err){
										if(err){
											res.sendStatus(500).json(err)
										}


									})

								})
								
							}
						}


					});


					res.json(resultQueryEnterprise);
				})

			})



});

// ENDPOINT 1er

router.post('/enterprise_information', jsonParser, function (req, res){
	if (!req.body) return res.sendStatus(400)

		let data = req.body;		

		let enterprise = new Enterprise()

		//creacion de empresa

		enterprise.optionNames = data.optionNames;
		enterprise.industry = data.industry;
		enterprise.societyType = data.societyType;
		enterprise.isItMoneyCapital = data.isItMoneyCapital;
		enterprise.isItGoodsCapital = data.isItGoodsCapital;
		enterprise.totalCapital = data.totalCapital;
		enterprise.accountManager = req.user;

		let partner = new Partners()
		partner.user = req.user._id;

		partner.save()

		enterprise.partners.push(partner);

		enterprise.save(function(err){
			if(err){
				res.sendStatus(500).json(err)
			}else{

				Userprofiles.
					findById(req.user._id).
					exec(function(err, user){
						if (err) throw err;

						user.enterprise.push(enterprise._id);

						user.save(function(err){
							if(err){
								res.sendStatus(500).json(err)
							}else{

							

								Enterprise.findById(enterprise._id).
								populate({
									path: "partners"
								}).
								exec(function (err, enterprise_info){

									if (err) {return res.sendStatus(500).json(err)}
	
									let options = {
										path : 'partners.user',
										model : 'Userprofiles'
									}
									
									Enterprise.populate(enterprise_info, options, function (err, e_data){
										if (err) throw err;

										let json = {
											enterprise : enterprise_info,
											user : user
										}
									
										res.json(json)
									});

								})

								

							}
						})
					});
			}
		})

		
});


// ENDPOINT 2do paso

router.post('/partners_invitation', jsonParser, function (req, res){
	if (!req.body) return res.sendStatus(400)

		let data = req.body;
			
		Partners.findById(data.partners[0]._id).
			exec(function(err, partner){
				if(err){
					res.sendStatus(500).json(err)
				} else{
					partner.position = data.partners[0].position;

					partner.save(function(err){
						if(err){
							res.sendStatus(500).json(err)
						}else{





							Enterprise.findById(data._id).
								
								exec(function (err, enterprise_info){

									if (err) {return res.sendStatus(500).json(err)}

									if(data.partners.length > 0 ){

										// arranca en la posicion 1 xq el pos 0 siempre es el accountmanager

										for(let i = 1; i < data.partners.length; i++){

											let partner = new Partners()
											let user = new Userprofiles()

											user.name = data.partners[i].user.name;
											user.enterprise.push(enterprise_info._id)
											

											user.save();

											partner.user = user._id;

											partner.position = data.partners[i].position;

											partner.save()

											enterprise_info.partners.push(partner);

										}						

										enterprise_info.save(function(err){
											if(err){
												res.sendStatus(500).json(err)
											}else{

												let options = {
													path : 'partners',
													model : 'Partners'
												}
												
												Enterprise.populate(enterprise_info, options, function (err, enterprise_data){
													if(err){
														res.sendStatus(500).json(err)
													}else{
														
														let options = {
															path : 'partners.user',
															model : 'Userprofiles'
														}

														Enterprise.populate(enterprise_data, options, function(err, result){
															if(err){
																res.sendStatus(500).json(err)
															}else{
																let json = {
																	enterprise : result
																}
															
																res.json(json)
															}
														});

													}

													
												});

											

											}
										})



									}

								});

						


						}
					});
				}
			});




});


router.post('/partners_invitation_update', jsonParser, function (req, res){
	if (!req.body) return res.sendStatus(400)
		let data = req.body;

		// iterar sobre los partners comprobar si ya existe y si es nuevo crear uno si no tiene id
		let partners_data = []

		for(let i = 0; i< data.partners.length; i++){
			Partners.findById(data.partners[i]._id).
				populate({
					path : 'user'
				}).
				exec(function(err, partner){
					if (!req.body) return res.sendStatus(400);

					

					partner.position = data.partners[i].position;
					partner.user.name = data.partners[i].user.name;

					partner.save(function(err){
						if(err){
							res.sendStatus(500).json(err)
						}else{

							partners_data.push(partner)

						}
					})
				});
		}

		res.json(partners_data);
		/*
		for(let i = 0; i < enterprise_info.partners.length; i++){

			let partnerDB_id = enterprise_info.partners[i]
			for(let i = 0; i < data.partners.length; i++){
				if(data.partners[i]._id == partnerDB){
					partnerDB.position == data.partners[i].position;
					partnerDB.save()
				}else{

					let partner = new Partners()
				
					let user = new Userprofiles()

					user.name = data.partners[i].user.name;
					

					user.save();

					partner.user = user._id;
					partner.position = data.partners[i].position;

					partner.save()

					enterprise_info.partners.push(partner);
				}
			}
		}
		*/


});

router.post('/delete_partner_invitation', jsonParser, function (req, res){
	if (!req.body) return res.sendStatus(400)
		let data = req.body;
		console.log(data)

		Partners.remove({_id : data.partner_id}, function(err){
			if(err){
				res.sendStatus(400);
			}else{

				Userprofiles.remove({_id :  data.user_id}, function(err){
					if(err){
						res.sendStatus(400);
					}else{
						Enterprise.findById(data.enterprise_id).
							populate({
								path: "partners"
							}).
							exec(function(err, enterprise){

								console.log(enterprise)
								if(err){
									res.sendStatus(500).json(err)
								}else{

									enterprise.partners.map((partner, index)=>{
										if(partner._id == data.partner_id){
											enterprise.partners.splice(index, 1)
										}
									});
									console.log("previo al save de enterprise")
									console.log(enterprise)

									enterprise.save(function(err){
										if(err){
											res.sendStatus(500).json(err)
										}else{

											console.log(enterprise)

											let json = { state : 1}
											res.json(json);


										}
									})

								}
							})

					}
				})

				
			}
		});

	




});



export default router
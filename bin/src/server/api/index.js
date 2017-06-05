'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

var _enterprises = require('src/server/models/enterprises');

var _enterprises2 = _interopRequireDefault(_enterprises);

var _partners = require('src/server/models/partners');

var _partners2 = _interopRequireDefault(_partners);

var _appadmin = require('src/server/models/appadmin');

var _appadmin2 = _interopRequireDefault(_appadmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//configuracion para el router
var router = _express2.default.Router();
//configuracion para el bodyparser
var jsonParser = _bodyParser2.default.json();

//SE CAMBIO A TRUE PERO YA FUNCIONABA EN FALSE
var urlencodedParser = _bodyParser2.default.urlencoded({ extended: true });

//Variables setting
var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

// ENDPOINTS //

router.get('/usersession', function (req, res) {

	//console.log(req.session.passport.user)


	if (!req.user) {
		res.json({ user: false });
	} else {

		console.log("se ejecuta query");

		_userprofiles2.default.findById(req.user._id).populate({
			path: 'enterprise'
		}).exec(function (err, user) {
			if (err) {
				return res.sendStatus(500).json(err);
			}

			var options = {
				path: 'enterprise.partners',
				model: 'Partners'
			};

			_partners2.default.populate(user, options, function (err, partners) {
				if (err) throw err;

				var options = {
					path: 'enterprise.partners.user',
					model: 'Userprofiles'
				};

				_userprofiles2.default.populate(partners, options, function (err, result) {
					if (err) {
						throw err;
					} else {

						//console.log(result)
						res.json(result);
					}
				});
			});
		});
	}
});

//ENDPOINT update 1 y 2
router.post('/enterprise_information_update', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var data = req.body;
	console.log("enterprise_information_update");
	console.log(data);

	_enterprises2.default.findById(data._id).populate({
		path: 'partners'
	}).exec(function (err, enterprise) {

		if (err) {
			return res.sendStatus(500).json(err);
		}

		var options = {
			path: 'partners.user',
			model: 'Userprofiles'
		};

		_userprofiles2.default.populate(enterprise, options, function (err, enterprise_info) {
			if (err) throw err;
			console.log("ultimo populate");
			console.log(data.industry);
			console.log(enterprise_info);

			enterprise_info.industry = data.industry;
			enterprise_info.isItGoodsCapital = data.isItGoodsCapital;
			enterprise_info.isItMoneyCapital = data.isItMoneyCapital;
			enterprise_info.optionNames = data.optionNames;

			enterprise_info.societyType = data.societyType;
			enterprise_info.totalCapital = data.totalCapital;

			enterprise_info.save(function (err) {
				if (err) {
					res.sendStatus(500).json(err);
				} else {

					res.json(enterprise_info);
				}
			});
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
router.post('/signing_date_information', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var data = req.body;

	_enterprises2.default.findById(data._id).populate({
		path: 'partners'
	}).exec(function (err, enterprise) {

		if (err) {
			return res.sendStatus(500).json(err);
		}

		enterprise.signAppointmentDate = data.signAppointmentDate;
		enterprise.signAppointmentTime = data.signAppointmentTime;
		enterprise.signAppointmentLocation = data.signAppointmentLocation;

		var base = 650;

		var num_positions = 0;

		var vPartners = 0;

		for (var i = 0; i < enterprise.partners.length; i++) {

			if (enterprise.partners[i].position != '' && enterprise.partners[i].position != "Ninguno") {

				num_positions = num_positions + 1;
			}
		}

		if (num_positions > 1) {

			var num = num_positions - 1;

			vPartners = num * 45;
		} else {

			vPartners = 0;
		}

		var vBCapital = void 0;

		if (enterprise.totalCapital > 5000) {

			vBCapital = enterprise.totalCapital / 5000;
		} else {
			vBCapital = 0;
		}

		var vCapital = vBCapital * 30;

		var price = vPartners + vCapital + base;

		enterprise.price = price;

		enterprise.save(function (err) {
			if (err) {
				res.sendStatus(500).json(err);
			}

			// aca se debe hacer el calculo de cuanto va a costar el servicio
			// y hay q grabarlo en la base de datos y devolver esa información
			res.json(enterprise);
		});
	});
});

//ENDPOINT 3er paso

router.post('/partners_information', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var data = req.body;

	var partnersJsonData = data.partners;

	_enterprises2.default.findById(data._id).populate({
		path: 'partners'
	}).exec(function (err, enterprise) {

		if (err) {
			return res.sendStatus(500).json(err);
		}

		var options = {
			path: 'partners.user',
			model: 'Userprofiles'
		};
		_userprofiles2.default.populate(enterprise, options, function (err, resultQueryEnterprise) {
			if (err) throw err;

			resultQueryEnterprise.partners.map(function (partner) {

				var partnerId = partner._id;

				var _loop = function _loop(i) {

					if (partnerId == partnersJsonData[i]._id) {

						if (partnersJsonData[i].moneyInput) {
							partner.moneyInput = partnersJsonData[i].moneyInput;
						}
						if (partnersJsonData[i].goodsInput) {
							partner.goodsInput = partnersJsonData[i].goodsInput;
						}

						partner.save(function (err) {
							if (err) res.sendStatus(500).json(err);

							var user = partner.user;

							if (partnersJsonData[i].user.name) {
								user.name = partnersJsonData[i].user.name;
							}
							if (partnersJsonData[i].user.documentType) {
								user.documentType = partnersJsonData[i].user.documentType;
							}
							if (partnersJsonData[i].user.documentNumber) {
								user.documentNumber = partnersJsonData[i].user.documentNumber;
							}
							if (partnersJsonData[i].user.email) {
								user.email = partnersJsonData[i].user.email;
							}
							if (partnersJsonData[i].user.location) {
								user.location = partnersJsonData[i].user.location;
							}
							if (partnersJsonData[i].user.civilStatus) {
								user.civilStatus = partnersJsonData[i].user.civilStatus;
							}
							if (partnersJsonData[i].user.coupleDocumentType) {
								user.coupleDocumentType = partnersJsonData[i].user.coupleDocumentType;
							}
							if (partnersJsonData[i].user.coupleDocumentNumber) {
								user.coupleDocumentNumber = partnersJsonData[i].user.coupleDocumentNumber;
							}

							user.save(function (err) {
								if (err) {
									res.sendStatus(500).json(err);
								}
							});
						});
					}
				};

				for (var i = 0; i < partnersJsonData.length; i++) {
					_loop(i);
				}
			});

			res.json(resultQueryEnterprise);
		});
	});
});

// ENDPOINT 1er

router.post('/enterprise_information', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var data = req.body;

	var enterprise = new _enterprises2.default();

	//creacion de empresa

	enterprise.optionNames = data.optionNames;
	enterprise.industry = data.industry;
	enterprise.societyType = data.societyType;
	enterprise.isItMoneyCapital = data.isItMoneyCapital;
	enterprise.isItGoodsCapital = data.isItGoodsCapital;
	enterprise.totalCapital = data.totalCapital;
	enterprise.accountManager = req.user;

	var partner = new _partners2.default();
	partner.user = req.user._id;

	partner.save();

	enterprise.partners.push(partner);

	enterprise.save(function (err) {
		if (err) {
			res.sendStatus(500).json(err);
		} else {

			_userprofiles2.default.findById(req.user._id).exec(function (err, user) {
				if (err) throw err;

				user.enterprise.push(enterprise._id);

				user.save(function (err) {
					if (err) {
						res.sendStatus(500).json(err);
					} else {

						_enterprises2.default.findById(enterprise._id).populate({
							path: "partners"
						}).exec(function (err, enterprise_info) {

							if (err) {
								return res.sendStatus(500).json(err);
							}

							var options = {
								path: 'partners.user',
								model: 'Userprofiles'
							};

							_enterprises2.default.populate(enterprise_info, options, function (err, e_data) {
								if (err) throw err;

								var json = {
									enterprise: enterprise_info,
									user: user
								};

								res.json(json);
							});
						});
					}
				});
			});
		}
	});
});

// ENDPOINT 2do paso

router.post('/partners_invitation', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);

	var data = req.body;

	_partners2.default.findById(data.partners[0]._id).exec(function (err, partner) {
		if (err) {
			res.sendStatus(500).json(err);
		} else {
			partner.position = data.partners[0].position;

			partner.save(function (err) {
				if (err) {
					res.sendStatus(500).json(err);
				} else {

					_enterprises2.default.findById(data._id).exec(function (err, enterprise_info) {

						if (err) {
							return res.sendStatus(500).json(err);
						}

						if (data.partners.length > 0) {

							// arranca en la posicion 1 xq el pos 0 siempre es el accountmanager

							for (var i = 1; i < data.partners.length; i++) {

								var _partner = new _partners2.default();
								var user = new _userprofiles2.default();

								user.name = data.partners[i].user.name;
								user.enterprise.push(enterprise_info._id);

								user.save();

								_partner.user = user._id;

								_partner.position = data.partners[i].position;

								_partner.save();

								enterprise_info.partners.push(_partner);
							}

							enterprise_info.save(function (err) {
								if (err) {
									res.sendStatus(500).json(err);
								} else {

									var options = {
										path: 'partners',
										model: 'Partners'
									};

									_enterprises2.default.populate(enterprise_info, options, function (err, enterprise_data) {
										if (err) {
											res.sendStatus(500).json(err);
										} else {

											var _options = {
												path: 'partners.user',
												model: 'Userprofiles'
											};

											_enterprises2.default.populate(enterprise_data, _options, function (err, result) {
												if (err) {
													res.sendStatus(500).json(err);
												} else {
													var json = {
														enterprise: result
													};

													res.json(json);
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

router.post('/partners_invitation_update', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);
	var data = req.body;

	// iterar sobre los partners comprobar si ya existe y si es nuevo crear uno si no tiene id
	var partners_data = [];

	var _loop2 = function _loop2(i) {
		_partners2.default.findById(data.partners[i]._id).populate({
			path: 'user'
		}).exec(function (err, partner) {
			if (!req.body) return res.sendStatus(400);

			partner.position = data.partners[i].position;
			partner.user.name = data.partners[i].user.name;

			partner.save(function (err) {
				if (err) {
					res.sendStatus(500).json(err);
				} else {

					partners_data.push(partner);
				}
			});
		});
	};

	for (var i = 0; i < data.partners.length; i++) {
		_loop2(i);
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

router.post('/delete_partner_invitation', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);
	var data = req.body;
	console.log(data);

	_partners2.default.remove({ _id: data.partner_id }, function (err) {
		if (err) {
			res.sendStatus(400);
		} else {

			_userprofiles2.default.remove({ _id: data.user_id }, function (err) {
				if (err) {
					res.sendStatus(400);
				} else {
					_enterprises2.default.findById(data.enterprise_id).populate({
						path: "partners"
					}).exec(function (err, enterprise) {

						console.log(enterprise);
						if (err) {
							res.sendStatus(500).json(err);
						} else {

							enterprise.partners.map(function (partner, index) {
								if (partner._id == data.partner_id) {
									enterprise.partners.splice(index, 1);
								}
							});
							console.log("previo al save de enterprise");
							console.log(enterprise);

							enterprise.save(function (err) {
								if (err) {
									res.sendStatus(500).json(err);
								} else {

									console.log(enterprise);

									var json = { state: 1 };
									res.json(json);
								}
							});
						}
					});
				}
			});
		}
	});
});

//ENDPOINT Obtener la lista de empresas con servicio activo

router.get('/all_enterprises', function (req, res) {
	// este debe cambiar a 1 despues de programar el endpoint de actualizacion para recibir solo las activas

	_enterprises2.default.find({ inProcess: false }).populate({
		path: 'partners'
	}).exec(function (err, enterprise) {
		if (err) {
			res.sendStatus(500).json(err);
		} else {

			var options = {
				path: 'partners.user',
				model: 'Userprofiles'
			};

			_enterprises2.default.populate(enterprise, options, function (err, enterprise_info) {
				if (err) throw err;

				var options = {
					path: 'accountManager',
					model: 'Userprofiles'
				};

				_enterprises2.default.populate(enterprise_info, options, function (err, e_data) {
					if (err) {
						res.sendStatus(500).json(err);
					} else {
						res.json(e_data);
					}
				});
			});
		}
	});
});

//ENDPOINT listar usuarios admin

router.get('/all_users_admin', function (req, res) {

	_appadmin2.default.find({}).populate({
		path: "users",
		model: "Userprofiles"
	}).exec(function (err, appAdmin) {
		if (err) {
			res.sendStatus(500).json(err);
		} else {

			var json = appAdmin[0].users;
			res.json(json);
		}
	});
});

//ENDPOINT Detalle empresa

router.post('/enterprise_detail', function (req, res) {
	if (!req.body) return res.sendStatus(400);
	var data = req.body;
	console.log(data);

	_enterprises2.default.findById(data.enterprise_id).populate({
		path: "partners"
	}).exec(function (err, enterprise) {
		if (err) {
			res.sendStatus(500).json(err);
		} else {

			var options = {
				path: 'partners.user',
				model: 'Userprofiles'
			};

			_userprofiles2.default.populate(enterprise, options, function (err, enterprise_info) {
				if (err) throw err;

				var options = {
					path: 'accountManager',
					model: 'Userprofiles'
				};

				_userprofiles2.default.populate(enterprise, options, function (err, result) {
					if (err) {

						res.sendStatus(500).json(err);
					} else {

						res.json(result);
					}
				});
			});
		}
	});
});

// ENDPOINT Asignar permisos de usuario

router.post('/add_user_admin', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);
	var data = req.body;

	_appadmin2.default.find({}, function (err, appadmin) {

		if (err) {
			res.sendStatus(500).json(err);
		} else {

			if (req.user._id == appadmin[0].theCreator) {

				_userprofiles2.default.findById(data.user_id).exec(function (err, user) {

					appadmin[0].users.push(user._id);

					appadmin[0].save(function (err) {
						if (err) {
							res.sendStatus(500).json(err);
						} else {

							var json = { state: 1 };
							res.json(json);
						}
					});
				});
			} else {
				var json = { state: 0 };
				res.json(json);
			}
		}
	});
});

// ENDPOINT Eliminar userAdmin

router.post('/delete_userAdmin', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);
	var data = req.body;
	console.log(data);

	_appadmin2.default.find().populate({
		path: 'users'
	}).exec(function (err, adminData) {

		console.log(adminData);
		if (err) {
			res.sendStatus(500).json(err);
		} else {
			for (var i = 0; i < adminData[0].users.length; i++) {

				if (adminData[0].users[i]._id == data.user_id) {

					adminData[0].users.splice(i, 1);

					adminData[0].save(function (err) {
						if (err) {
							res.sendStatus(500).json(err);
						} else {

							var json = {
								users: adminData[0].users
							};
							res.json(json);
						}
					});
				}
			}
		}
	});
});

// ENDPOINT crear super usuario

router.post('/create_super_user', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);
	var data = req.body;
	console.log(data);

	var appAdmin = new _appadmin2.default();

	appAdmin.theCreator = req.user._id;
	appAdmin.users.push(req.user._id);

	appAdmin.save(function (err) {
		if (err) {
			res.sendStatus(500).json(err);
		} else {

			var _data = {
				state: 1
			};

			res.json(_data);
		}
	});
});

// ENDPOINT confirmación si es the creator

router.get('/is_it_the_creator', function (req, res) {
	if (!req.body) return res.sendStatus(400);
	var data = req.body;

	_appadmin2.default.find().exec(function (err, appadmin) {

		var adminData = appadmin[0];

		if (err) {
			res.sendStatus(500).json(err);
		} else {
			if (adminData.theCreator == req.user._id) {

				var json = { state: 1 };
				res.json(json);
			} else {
				var _json = { state: 0 };
				res.json(_json);
			}
		}
	});
});

// ENDPOINT confirmacion si es admin

router.post('/is_it_admin', function (req, res) {
	if (!req.body) return res.sendStatus(400);

	console.log("is_it_admin");
	console.log(req.user._id);

	if (req.user) {
		_appadmin2.default.find().populate({
			path: "users"
		}).exec(function (err, appadmin) {
			if (err) {
				res.sendStatus(500).json(err);
			} else {

				var json = void 0;

				for (var i = 0; i < appadmin[0].users.length; i++) {
					console.log("usuario");
					console.log(appadmin[0].users[i]);
					if (req.user._id == appadmin[0].users[i]._id) {
						json = { state: 1 };

						break;
					} else {
						json = { state: 0 };
					}
				}
				res.json(json);
			}
		});
	}
});

//ENDPOINT update service state

router.post('/update_service_state', jsonParser, function (req, res) {
	if (!req.body) return res.sendStatus(400);
	var data = req.body;

	console.log(data);

	_enterprises2.default.findById(data.enterpriseId).exec(function (err, enterprise) {

		enterprise.serviceState = data.serviceState;

		console.log(enterprise.serviceState);

		enterprise.save(function (err) {
			if (err) {
				res.sendStatus(500).json(err);
			} else {

				_enterprises2.default.find({ inProcess: false }).populate({
					path: 'partners'
				}).exec(function (err, enterprise) {
					if (err) {
						res.sendStatus(500).json(err);
					} else {

						var options = {
							path: 'partners.user',
							model: 'Userprofiles'
						};

						_enterprises2.default.populate(enterprise, options, function (err, enterprise_info) {
							if (err) throw err;

							var options = {
								path: 'accountManager',
								model: 'Userprofiles'
							};

							_enterprises2.default.populate(enterprise_info, options, function (err, e_data) {
								if (err) {
									res.sendStatus(500).json(err);
								} else {

									console.log(e_data);
									res.json(e_data);
								}
							});
						});
					}
				});
			}
		});
	});
});

exports.default = router;
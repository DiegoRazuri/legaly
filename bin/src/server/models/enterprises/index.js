'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EnterpriseSchema = new _mongoose2.default.Schema({

	name: { type: String },
	optionNames: [{ type: String }],
	industry: { type: String },
	societyType: { type: String },
	partners: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Partners' }],
	isItMoneyCapital: { type: Boolean, default: false },
	isItGoodsCapital: { type: Boolean, default: false },
	totalCapital: { type: Number },
	accountManager: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	signAppointmentDate: { type: Date },
	notary: { type: String },
	signAppointmentLocation: { type: String },
	price: { type: Number },
	inProcess: { type: Boolean, default: false },
	serviceState: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now }

});

exports.default = _mongoose2.default.model('Enterprises', EnterpriseSchema);
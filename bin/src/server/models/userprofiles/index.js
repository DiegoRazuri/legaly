'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _enterprises = require('src/server/models/enterprises');

var _enterprises2 = _interopRequireDefault(_enterprises);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserprofileSchema = new _mongoose2.default.Schema({

	name: { type: String },
	lastname: { type: String, default: ' ' },
	profile_provider_link: { type: String },
	username: { type: String },
	profession: { type: String },
	photo: { type: String },
	link: { type: String },
	email: { type: String },
	documentType: { type: String },
	documentNumber: { type: Number },
	goodsSeparation: { type: Number },
	registryNumber: { type: Number },
	regitryOffice: { type: String },
	location: { type: String },
	civilStatus: { type: String },
	coupleDocumentType: { type: String },
	coupleDocumentNumber: { type: Number },
	enterprise: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Enterprises' }],
	phoneNumber: { type: Number },
	provider: { type: String },
	contacts: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	userState: { type: Number, default: 0 },
	createdAt: { type: Date, default: Date.now }

});

UserprofileSchema.index({
	username: 'text',
	name: 'text',
	lastname: 'text',
	position: 'text'
});

exports.default = _mongoose2.default.model('Userprofiles', UserprofileSchema);
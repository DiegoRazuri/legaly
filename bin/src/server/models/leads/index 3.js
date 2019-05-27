'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LeadsSchema = new _mongoose2.default.Schema({

	name: { type: String },
	enterprise: { type: String, default: ' ' },
	email: { type: String },
	cel: { type: Number, default: 0 },
	product: { type: String },
	message: { type: String },
	createdAt: { type: Date, default: Date.now }

}, {
	usePushEach: true
});

LeadsSchema.index({
	name: 'text',
	enterprise: 'text',
	email: 'text',
	product: 'text',
	message: 'text'
});

exports.default = _mongoose2.default.model('Leads', LeadsSchema);
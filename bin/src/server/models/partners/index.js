'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoodsCapital = new _mongoose2.default.Schema({

	goodName: { type: String },
	goodValue: { type: Number }

});

var PartnerSchema = new _mongoose2.default.Schema({

	user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' },
	moneyInput: { type: Number },
	goodsInput: [GoodsCapital],
	position: { type: String }

});

exports.default = _mongoose2.default.model('Partners', PartnerSchema);
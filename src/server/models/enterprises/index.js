import mongoose from 'mongoose'
import Userprofiles from 'src/server/models/userprofiles'





let EnterpriseSchema = new mongoose.Schema({

	name: { type: String },
	optionNames: [{ type: String}],
	industry: { type: String },
	societyType: { type: String },
	partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partners' }],
	isItMoneyCapital: {type: Boolean, default : false},
	isItGoodsCapital: {type: Boolean, default : false},
	totalCapital: {type: Number},
	accountManager: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	signAppointmentDate: {type:Date},
	notary: {type: String},
	signAppointmentLocation : {type: String},
	price : {type:Number},
	tokenId : {type:String},
	paymentMethod : {type:String},
	inProcess : {type: Boolean, default : false},
	serviceState : {type: Number, default : 0},
	createdAt: {type: Date, default: Date.now}
	
})



export default mongoose.model('Enterprises', EnterpriseSchema)
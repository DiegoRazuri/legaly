import mongoose from 'mongoose'
import Userprofiles from 'src/server/models/userprofiles'





let EnterpriseSchema = new mongoose.Schema({

	name: { type: String },
	optionNames: [{ type: String}],
	industry: { type: String },
	partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partners' }],
	isItMoneyCapital: {type: Boolean, default : false},
	isItGoodsCapital: {type: Boolean, default : false},
	totalCapital: {type: Number},
	accountManager: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	createdAt: {type: Date, default: Date.now}
	
})



export default mongoose.model('Enterprises', EnterpriseSchema)
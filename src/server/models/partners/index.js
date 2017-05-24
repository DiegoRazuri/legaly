import mongoose from 'mongoose'
import Userprofiles from 'src/server/models/userprofiles'

let GoodsCapital = new mongoose.Schema({

	goodName : { type: String },
	goodValue : {type: Number}

})

let PartnerSchema = new mongoose.Schema({

	user: { type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' },
	moneyInput: {type: Number},
	goodsInput: [GoodsCapital],
	position: {type: String}
	
})



export default mongoose.model('Partners', PartnerSchema)
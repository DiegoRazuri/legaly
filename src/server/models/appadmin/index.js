import mongoose from 'mongoose'
import Userprofiles from 'src/server/models/userprofiles'


let AppadminSchema = new mongoose.Schema({

	theCreator : { type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' },
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	createdAt: {type: Date, default: Date.now}

})



export default mongoose.model('Appadmin', AppadminSchema)

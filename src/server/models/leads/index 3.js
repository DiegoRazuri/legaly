import mongoose from 'mongoose'




let LeadsSchema = new mongoose.Schema({

	name: { type: String },
	enterprise: { type: String, default: ' ' },
	email : { type: String },
	cel : { type: Number, default : 0 },
	product : { type: String },
	message: { type: String },
	createdAt: {type: Date, default: Date.now}

},{
	usePushEach: true 	
})

LeadsSchema.index({
	name:'text',
	enterprise: 'text',
	email:'text',
	product: 'text',
	message:'text'
});

export default mongoose.model('Leads', LeadsSchema)
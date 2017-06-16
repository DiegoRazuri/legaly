import mongoose from 'mongoose'
import Enterprises from 'src/server/models/enterprises'




let UserprofileSchema = new mongoose.Schema({

	name: { type: String },
	lastname: { type: String, default: ' ' },
	profile_provider_link : { type: String },
	username : { type: String },
	position : { type: String },
	photo: { type: String },
	link: { type: String },
	email: { type: String },
	documentType: { type: String},
	documentNumber: {type: Number},
	goodsSeparation: {type: Number},
	registryNumber: {type: Number},
	regitryOffice: { type: String},
	location: { type: String},
	civilStatus: { type: String},
	coupleDocumentType: { type: String},
	coupleDocumentNumber: {type: Number},
	enterprise: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enterprises' }],
	phoneNumber: {type: Number},
	provider: { type: String },
	contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	userState: { type: Number, default: 0 },
	createdAt: {type: Date, default: Date.now}

})

UserprofileSchema.index({
	username:'text',
	name: 'text',
	lastname:'text',
	position: 'text'
});

export default mongoose.model('Userprofiles', UserprofileSchema)
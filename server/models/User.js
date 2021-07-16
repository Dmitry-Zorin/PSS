import mongoose from 'mongoose'

const schema = new mongoose.Schema(
	{
		login: {
			type: String,
			required: true,
			index: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		locale: String,
		theme: String,
		createdAt: {
			type: Date,
			index: true,
		}
	},
	{
		timestamps: true,
	},
)

//schema.index({ createdAt: -1 })

schema.virtual('id').get(function() {
	return this.login
})

schema.set('toObject', { virtuals: true })

export default mongoose.model('User', schema)

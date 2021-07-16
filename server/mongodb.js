import mongoose from 'mongoose'

export default () => (
	mongoose.connect(process.env.ATLAS_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: true
	})
)

mongoose.connection.on('error', console.log)

module.exports = {
	port: 27017,
	secretKey: 'mysecretkey',
	mongodbConfig: {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	},
	serverIP: '127.0.0.1',
	saltRounds: 10,
}

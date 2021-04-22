const minimist = require('minimist')
const mongoose = require('mongoose')
const schema = require('../schemas').userSchema
const mongodbConfig = require('../mongodbConfig')
const bcrypt = require('bcrypt')

const args = minimist(process.argv.slice(2))
if (!args.login) return console.log('login required')
if (!args.password) return console.log('password required')

mongoose.connect(`mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`, mongodbConfig)
    .then(() => {
        const User = mongoose.model('User', schema)
        User.findOne({login: args.login})
            .then(user => {
                if (user) throw Error('login exists')
                bcrypt.hash(args.password, process.env.SALT_ROUNDS)
                    .then(hash => {
                        const userData = {
                            login: args.login,
                            password: hash,
                            isAdmin: true,
                            firstCreationDate: new Date(),
                        }
                        const modelRecord = new User(userData)
                        modelRecord.save()
                            .then(() => console.log('User added'))
                            .catch(error => console.log(error.message))
                            .finally(() => mongoose.disconnect())
                    })
                    .catch(error => {
                        console.log(error.message)
                        mongoose.disconnect()
                    })
            })
            .catch(error => {
                console.log(error.message)
                mongoose.disconnect()
            })
    })
    .catch(error => {
        console.log(error.message)
        mongoose.disconnect()
    })
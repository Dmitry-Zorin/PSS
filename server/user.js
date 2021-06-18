const minimist = require('minimist')
const mongoose = require('mongoose')
const schema = require('./schemas/schemas').userSchema
const connectToDb = require('./mongodb')
const bcrypt = require('bcrypt')

const {username, password, admin} = minimist(process.argv.slice(2))

if (!username) {
    console.warn('Username required!')
    process.exit(1)
}

if (!password) {
    console.warn('Password required!')
    process.exit(1)
}

connectToDb
    .then(async () => {
        try {
            const User = mongoose.model('User', schema)

            if (await User.findOne({login: username})) {
                return console.warn('User already exists!')
            }

            await User.create({
                login: username,
                password: await bcrypt.hash(password, 10),
                isAdmin: admin,
                firstCreationDate: new Date(),
            })
            console.log(`${admin ? 'Admin' : 'User'} "${username}" has been added!`)
        }
        catch (err) {
            console.error(err)
            process.exit(1)
        }
        finally {
            await mongoose.disconnect()
            process.exit(0)
        }
    })
    .catch(console.log)

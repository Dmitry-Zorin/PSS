const mongoose = require('mongoose')
const schema = require('../schemas/schemas').userSchema
const jsonParser = require('express').json()
const listParamsMiddleware = require('../utils').listParamsMiddleware
const jsonWebToken = require('jsonwebtoken')
const cookieParser = require('cookie-parser')()
const auth = require('../auth').auth
const bcrypt = require('bcrypt')
const axios = require('axios')

const User = mongoose.model('User', schema)

const extractDataToSend = (data) => (
    {
        id: data.id,
        login: data.login,
        password: data.password,
        isAdmin: data.isAdmin,
        firstCreationDate: data.firstCreationDate,
    }
)

const extractDataFromRequest = (req) => (
    {
        login: req.body.login,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    }
)

const resource = 'users'

module.exports = (app) => {
    app.get('/login', (req, res) => {
        const login = req.query.username
        return axios.get(`http://10.12.21.193/users.json?name=${login}`)
            .then(resp => {
                console.log(resp)
                if (!resp.data.users.length) {
                    return res.status(401).json({error: 'Incorrect login or password'})
                }
                const payload = {login, isAdmin: false}
                const token = jsonWebToken.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 31536000
                })
                return res.cookie('token', token, {httpOnly: true}).redirect('/')
            })
            .catch((err) => {
                console.log(err)
                res.status(401).json({error: 'Incorrect login or password'})
            })
    })

    app.get('/login2', (req, res) => {
        const login = req.query.username
        return axios.get(`http://10.12.21.193/users.json?name=${login}`)
            .then(resp => {
                console.log(resp)
                if (!resp.data.users.length) {
                    return res.status(401).json({error: 'Incorrect login or password'})
                }
                const payload = {login, isAdmin: false}
                const token = jsonWebToken.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 31536000
                })
                return res.cookie('token', token, {httpOnly: true}).redirect('/library')
            })
            .catch(() => res.status(401).json({error: 'Incorrect login or password'}))
    })

    // login
    app.post('/api/login', jsonParser, (req, res) => {
        const {login, password} = req.body

        User.findOne({login})
            .then(user => {
                if (!user) {
                    return axios.get(`http://10.12.21.193/users.json?name=${login}`)
                        .then(resp => {
                            console.log(resp)
                            if (!resp.data.users.length) {
                                return res.status(401).json({error: 'Incorrect login or password'})
                            }
                            const payload = {login, isAdmin: user.isAdmin}
                            const token = jsonWebToken.sign(payload, process.env.SECRET_KEY, {
                                expiresIn: 31536000
                            })
                            return res.cookie('token', token, {httpOnly: true}).sendStatus(200)
                        })
                        .catch(() => res.status(401).json({error: 'Incorrect login or password'}))
                }
                bcrypt.compare(password, user.password)
                    .then(equal => {
                        if (!equal) {
                            return res.status(401).json({error: 'Incorrect login or password'})
                        }
                        const payload = {login, isAdmin: user.isAdmin}
                        const token = jsonWebToken.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: 31536000
                        })
                        res.cookie('token', token, {httpOnly: true}).sendStatus(200)
                    })
            })
            .catch(() => res.status(500).json({
                error: 'Internal error, please try again'
            }))
    })

    // logout
    app.get('/api/logout', (req, res) => {
        res.clearCookie('token').sendStatus(200)
    })

    // authenticate
    app.get('/api/authenticate', cookieParser, auth, (req, res) => {
        res.sendStatus(200)
    })

    // permissions
    app.get('/api/permissions', cookieParser, auth, (req, res) => {
        res.status(200).json({isAdmin: req.isAdmin})
    })

    // login existence
    app.post(`/api/${resource}/unique`, cookieParser, auth, jsonParser, (req, res) => {
        if (req.isAdmin) {
            let data = extractDataFromRequest(req)
            User.findOne({login: data.login})
                .then(user => {
                    if (user) res.json({exists: true})
                    else res.json({exists: false})
                })
                .catch(() => res.status(500).json({
                    error: 'Internal error, please try again'
                }))
        } else res.status(401).json({error: 'Access denied'})
    })

    // create
    app.post(`/api/${resource}`, cookieParser, auth, jsonParser, (req, res) => {
        if (req.isAdmin) {
            let data = extractDataFromRequest(req)

            User.findOne({login: data.login})
                .then(user => {
                    if (user) {
                        res.status(409).json({error: 'Login already exists'})
                        return
                    }
                    bcrypt.hash(data.password, process.env.SALT_ROUNDS)
                        .then(hash => {
                            data.password = hash
                            data['firstCreationDate'] = new Date()
                            const modelRecord = new User(data)
                            modelRecord.save()
                                .then(() => res.json(extractDataToSend(modelRecord)))
                                .catch(console.log)
                        })
                        .catch(() => res.status(500).json({
                            error: 'Internal error, please try again'
                        }))
                })
                .catch(() => res.status(500).json({
                    error: 'Internal error, please try again'
                }))
        } else {
            res.status(401).json({error: 'Access denied'})
        }
    })

    // delete
    app.delete(`/api/${resource}/:id`, cookieParser, auth, (req, res) => {
        if (req.isAdmin) {
            User.findByIdAndDelete({_id: req.params.id})
                .then(data => res.json(extractDataToSend(data)))
                .catch(error => console.log(error))
        } else res.status(401).json({error: 'Access denied'})
    })

    // getList
    app.get(`/api/${resource}`, cookieParser, auth, listParamsMiddleware, (req, res) => {
        if (req.isAdmin) {
            const {sortField, sortOrder, rangeStart, rangeEnd, filter} = req.listParams
            User.find(filter).sort({[sortField]: sortOrder})
                .then(data => {
                    const contentLength = `${resource} ${rangeStart}-${rangeEnd - 1}/${data.length}`
                    const dataToSend = data.slice(rangeStart, rangeEnd)
                        .map(dataItem => extractDataToSend(dataItem))
                    res.set('Content-Range', contentLength).send(dataToSend)
                })
                .catch(error => console.log(error))
        } else res.status(401).json({error: 'Access denied'})
    })

    // getOne
    app.get(`/api/${resource}/:id`, cookieParser, auth, (req, res) => {
        if (req.isAdmin) {
            User.findOne({_id: req.params.id})
                .then(data => res.json(extractDataToSend(data)))
                .catch(error => console.log(error))
        } else res.status(401).json({error: 'Access denied'})
    })
}
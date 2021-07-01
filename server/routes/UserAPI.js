const mongoose = require('mongoose')
const {userSchema} = require('../schemas/schemas')
const jsonParser = require('express').json()
const {listParamsMiddleware} = require('../utils')
const jsonWebToken = require('jsonwebtoken')
const cookieParser = require('cookie-parser')()
const {auth} = require('../auth')
const bcrypt = require('bcrypt')
const fetch = require('node-fetch')

const User = mongoose.model('User', userSchema)

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

const generateToken = (res, login, isAdmin) => {
    const token = jsonWebToken.sign(
        {login, isAdmin},
        process.env.SECRET_KEY,
        {expiresIn: 31536000}
    )
    res.cookie('token', token, {httpOnly: true})
}

const loginWithRedmine = async (req, res, username) => {
    let resp = await fetch(`${process.env.REDMINE_SERVER}/users.json?name=${username}`, {
        headers: {'X-Redmine-API-Key': process.env.REDMINE_KEY}
    })
    resp = await resp.json()
    let user
    if (!resp || !resp.users || !(user = resp.users.find(u => u.login.toLowerCase() === username))) {
        return 1
    }
    generateToken(res, username, user.admin)
}

module.exports = (app) => {
    app.get('/login', async (req, res, next) => {
        try {
            const errCode = await loginWithRedmine(req, res, req.query.username)
            res.redirect(errCode ? '/#/login' : '/#')
        }
        catch (err) {
            next(err)
        }
    })

    // login
    app.post('/api/login', jsonParser, async (req, res, next) => {
        try {
            const {login, password} = req.body
            const user = await User.findOne({login})

            if (user) {
                const passwordsMatch = await bcrypt.compare(password, user.password)
                if (passwordsMatch) {
                    generateToken(res, login, user.isAdmin)
                    return res.sendStatus(200)
                }
            }

            const errCode = await loginWithRedmine(req, res, login)
            errCode
                ? res.status(401).json({error: 'Incorrect login or password'})
                : res.sendStatus(200)
        }
        catch (err) {
            next(err)
        }
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
    app.post(`/api/${resource}/unique`, cookieParser, auth, jsonParser, async (req, res, next) => {
        if (!req.isAdmin) {
            res.status(401).json({error: 'Access denied'})
        }
        try {
            let data = extractDataFromRequest(req)
            const user = await User.findOne({login: data.login}).exec()
            res.json({exists: !!user})
        }
        catch (err) {
            next(err)
        }
    })

    // create
    app.post(`/api/${resource}`, cookieParser, auth, jsonParser, async (req, res, next) => {
        if (!req.isAdmin) {
            res.status(401).json({error: 'Access denied'})
        }
        try {
            let data = extractDataFromRequest(req)

            if (await User.findOne({login: data.login})) {
                return res.status(409).json({error: 'User already exists!'})
            }

            data.password = await bcrypt.hash(data.password, process.env.SALT_ROUNDS)
            data.firstCreationDate = new Date()

            res.json(
                await extractDataToSend(
                    await User.create(data)
                )
            )
        }
        catch (err) {
            next(err)
        }
    })

    // delete
    app.delete(`/api/${resource}/:id`, cookieParser, auth, async (req, res, next) => {
        if (!req.isAdmin) {
            res.status(401).json({error: 'Access denied'})
        }
        try {
            const record = await User.findByIdAndDelete({_id: req.params.id})
            res.json(await extractDataToSend(record))
        }
        catch (err) {
            next(err)
        }
    })

    // getList
    app.get(`/api/${resource}`, cookieParser, auth, listParamsMiddleware, async (req, res, next) => {
        if (!req.isAdmin) {
            res.status(401).json({error: 'Access denied'})
        }
        try {
            const {sortField, sortOrder, rangeStart, rangeEnd, filter} = req.listParams

            const userData = await User.find(filter).sort({[sortField]: sortOrder}).exec()
            const contentLength = `${resource} ${rangeStart}-${rangeEnd - 1}/${userData.length}`
            const dataToSend = userData.slice(rangeStart, rangeEnd)
                .map(async dataItem => await extractDataToSend(dataItem))

            res
                .set('Content-Range', contentLength)
                .send(await Promise.all(dataToSend))
        }
        catch (err) {
            next(err)
        }
    })

    // getOne
    app.get(`/api/${resource}/:id`, cookieParser, auth, async (req, res, next) => {
        if (!req.isAdmin) {
            res.status(401).json({error: 'Access denied'})
        }
        try {
            const record = await User.findOne({_id: req.params.id}).exec()
            res.json(extractDataToSend(record))
        }
        catch (err) {
            next(err)
        }
    })
}

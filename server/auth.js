const jsonWebToken = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized: no token provided'
        })
    }

    jsonWebToken.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            res.status(401).json({
                error: 'Unauthorized: invalid token'
            })
        } else {
            req.login = decoded.login
            req.isAdmin = decoded.isAdmin
            next()
        }
    })
}
const path = require('path')
const fs = require('fs')

const routesPath = path.join(__dirname, 'routes')

const requireAPI = (app, _path = routesPath) => {
    for (const api of fs.readdirSync(_path)) {
        if (api.endsWith('.js')) {
            require(path.join(_path, api))(app)
        }
        else {
            requireAPI(app, path.join(_path, api))
        }
    }
}

module.exports = requireAPI
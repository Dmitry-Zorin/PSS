const path = require('path')
const fs = require('fs')

const routesPath = path.join(__dirname, 'routes')

module.exports = (app) => {
    for (const api of fs.readdirSync(routesPath)) {
        require(path.join(routesPath, api))(app)
    }
}

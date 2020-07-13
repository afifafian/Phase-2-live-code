const routes = require('express').Router()
const UserController = require('../controllers/UserController')
const passRoutes = require('../routes/passRouter')

routes.post('/register', UserController.register)
routes.post('/login', UserController.login)
routes.use('/passwords', passRoutes)

module.exports = routes
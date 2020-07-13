const routes = require('express').Router()
const PasswordController = require('../controllers/PasswordController')
const {authentication, authorization} = require('../middlewares/auth')

routes.get('/', authentication,PasswordController.showPassword)
routes.post('/', authentication, PasswordController.addPassword)
routes.delete('/:id', authentication, authorization, PasswordController.deletePassword)

module.exports = routes
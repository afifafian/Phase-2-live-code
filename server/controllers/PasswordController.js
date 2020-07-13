"use strict"

const Password = require('../models')

class PasswordController {
    static addPassword (req, res) {
        const newPassword = {
            UserId: req.userData.id,
            name: req.body.name,
            url: req.body.url,
            password: req.body.password,
            username: req.body.username
        }
        Password.create(newPassword)
        .then(function(data){
            res.status(201).json(data)
        })
        .catch(function(err){
            res.status(500).json({message: err})
        })
    }
    static showPassword (req, res) {
        Password.findAll({
            where: {UserId: req.userData.id}
        })
        .then(function(data){
            res.status(200).json(data)
        })
        .cacth(function(err){
            res.status(500).json({message: err})
        })
    }
    static deletePassword (req, res) {

    }
}

module.exports = PasswordController
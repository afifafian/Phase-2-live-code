"use strict"

const {Password} = require('../models')

class PasswordController {
    static addPassword (req, res) {
        const newPassword = {
            UserId: req.userData.id,
            name: req.body.name,
            url: req.body.url,
            password: req.body.password,
            username: req.body.username
        }
        if (!newPassword.name || !newPassword.url || !newPassword.password || !newPassword.username) {
            res.status(400).json({message: `All field is required!`})
        } else {
            Password.create(newPassword)
            .then(function(data){
                return res.status(201).json(data)
            })
            .catch(function(err){
                return res.status(500).json({message: err})
            })
        }
    }
    static showPassword (req, res) {
        Password.findAll({
            where: {UserId: req.userData.id}
        })
        .then(function(data){
            return res.status(200).json(data)
        })
        .catch(function(err){
            return res.status(500).json({message: err})
        })
    }
    static deletePassword (req, res) {
        Password.destroy({
            where: {id: req.params.id}
        })
        .then(function(data){
            if (data[0] === 1) {
                return res.status(200).json({message: `Succesfully Deleted Password Data!`})
            } else {
                return res.status(404).json({message: `Password id not found!`})
            }
        })
        .catch(function(err){
            return res.status(500).json({message: err})
        })
    }
}

module.exports = PasswordController
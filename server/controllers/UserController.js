"use strict"

const {User} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {
    static register (req, res) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
        .then(function(data){
            return res.status(201).json(data)
        })
        .catch(function(err){
            return res.status(500).json({message: err})
        })
    }
    static login (req, res) {
        User.findOne({
            where: {email: req.body.email}
        })
        .then(function(data){
            if (!data) {
                res.status(404).json({message: `Data Not Found!`})
            } else {
                if (bcrypt.compareSync(req.body.password, data.password)) {
                    const token = jwt.sign(
                        {id: data.id, email: data.email}, 'jwtSECRET'
                    )
                    return res.status(200).json({access_token: token})
                } else {
                    return res.status(400).json({message: `Incorrect Email or Password!`})
                }
            }
        })
        .catch(function(err){
            console.log(err)
            return res.status(500).json({message: err})
        })
    }
}

module.exports = UserController
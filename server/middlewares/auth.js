"use strict"

const {User, Password} = require('../models')
const jwt = require('jsonwebtoken')

function authentication (req, res, next) {
    const access_token = req.headers.access_token

    if (!access_token) {
        res.status(404).json({message: `Token Not Found!`})
    } else {
        const userData = jwt.verify(access_token, 'jwtSECRET')
        req.userData = userData
        User.findOne({
            where:{email: userData.email}
        })
        .then(function(data){
            if (data) {
                next()
            } else {
                res.status(404).json({message: `email not found!`})
            }
        })
        .catch(function(err){
            res.status(500).json({message: err})
        })
    }
}
function authorization (req, res, next) {
    Password.findOne({
        where: {id: req.params.id}
    })
    .then(function(data){
        if (data) {
            if (data.UserId === req.userData.id) {
                next()
            } else {
                return res.status(403).json({message: `Forbidden Access!`})
            }
        } else {
            res.status(404).json({message: `Password not found!`})
        }
    })
    .catch(function(err){
        res.status(500).json({message: err})
    })
}


module.exports = {authentication, authorization}
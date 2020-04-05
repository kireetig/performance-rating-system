const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require("../middleware/errorHandler");
const User = require('../models/userModel');
const config = require('../../config/config');


router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                status: 409,
                message: 'Email already exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) errorHandler(res, err);
                else {
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    });
                    user.save().then((result) => {
                        const token = jwt.sign({
                                email: result.email,
                                id: result._id
                            },
                            config.JWT_KEY,
                            {
                                expiresIn: '100h'
                            });
                        res.status(200).json({
                            status: 200,
                            message: 'User Created',
                            token,
                            userId: result._id
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message: error,
                            status: 500
                        });
                    });
                }
            });
        }
    })

});

router.post('/login', (req, res, next) => {
    User.find({email: req.body.email}).select('+password').exec().then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth Failed',
                status: 401
            });
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed',
                        status: 401
                    })
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            id: user[0].id
                        },
                        config.JWT_KEY,
                        {
                            expiresIn: '1000h'
                        });
                    return res.status(200).json({
                        message: 'Auth Successful',
                        status: 200,
                        token,
                        userId: user[0].id
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed',
                    status: 401
                })
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err,
            status: 500
        });
    });
});

module.exports = router;
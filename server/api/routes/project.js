const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require("../middleware/errorHandler");
const Project = require('../models/projectModel');
const checkToken = require('../middleware/check-auth');

router.post('/create', checkToken, (req, res, next) => { 
    const payload = req.body;
    const project = new Project({
        name: payload.name,
        description: payload.description,
        userId: payload.userId,
        startDate: payload.startDate,
        endDate: payload.endDate,
        participants: payload.participants
    });
    project.save().then(result => {
        res.status(200).json({
            status: 200,
            data: result
        })
    }).catch(error => {
        res.status(500).json({
            error,
            status: 500
        });
    });
});

router.post('/update', checkToken, (req, res, next) => { 
    const payload = req.body;
    const project = new Project({
        name: payload.name,
        description: payload.description,
        userId: payload.userId,
        startDate: payload.startDate,
        endDate: payload.endDate,
        participants: payload.participants
    });
    project.update({_id: payload._id}).then(result => {
        res.status(200).json({
            status: 200,
            data: result
        })
    }).catch(error => {
        res.status(500).json({
            error,
            status: 500
        });
    });
});

router.get('/getAll', checkToken, (req, res, next) => { 
    Project.find({"userId": req.userData.id}, (err, result) => {
        if (err) {
            res.status(500).json({
                error: err,
                status: 500
            });
        }
        res.status(200).json({
            data: result,
            status: 200
        });
    });
});

module.exports = router;
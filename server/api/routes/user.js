const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require("../middleware/errorHandler");


router.post('/signup', (req, res, next) => {

});

router.get('/login', (req, res, next) => {
    return res.status(200).json({
        message: 'Its working',
        status: 200
    });
});

module.exports = router;
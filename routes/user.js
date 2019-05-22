const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
 const jwt = require('jsonwebtoken');
 const config = require('config');
const {User,validateUser} = require('../models/user');

const router = express.Router();

router.post('/', async (req,res)=>{
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});

    if(user) return res.status(500).send('User already registered');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    user = await user.save();
    
    let token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['name','email']));

});

module.exports = router;
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength:5,
        maxlength:255

    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        maxlength:1024
    }
});
let User = mongoose.model('User',userSchema);

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id},config.get('jwtPrivateKey'));
    return token;
}

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user,schema);
}


module.exports.User = User; 
module.exports.userSchema = userSchema;
module.exports.validateUser = validateUser;
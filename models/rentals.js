const mongoose = require('mongoose');
const Joi = require('joi');

const Rentals = mongoose.model('Rentals',{
    customer:{
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone:{
                type: String,
                required: true,
                minlength: 10
            }
        }),
        required: true
    },
    movie:{
        type: new mongoose.Schema({
            title:{
                type: String,
                required: true,
                trim: true,
                minlength:5,
                maxlength:255
            },
            dailyRentalRate:{
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned:{
        type: Date,
        required: true
    },
    rentalFee: {
        type: Number,
        required: true,
        min: 0
    }
});

function validateRental(Rentals){
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required
    };

    return Joi.validate(Rentals,schema)
}

module.exports.validateRental = validateRental;
module.exports.Rentals = Rentals;
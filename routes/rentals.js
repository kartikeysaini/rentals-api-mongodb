const {Rentals,validateRental} = require('../models/rentals');
const mongoose = require('mongoose');
const express = require('express');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const Fawn = require('fawn');
const router = express.Router();




router.post('/', async (req,res)=>{
    const error = validateRental(req.body);

    if(error)
    return res.status(401).send('invalid data');

    const customer = await Customer.findById(req.body.customerId);

    if(!customer)
    return res.status(400).send('invalid customer');

    const movie = await Movie.findById(req.body.movieId);

    if(!movie)
    return res.status(400).send('invalid movie');

    if(movie.numberInStock === 0)
    return res.status(400).send('movie not available in stock');
    
    let rental = new Rentals({
        customer:{
            _id:  customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
try{
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies',{_id: movie._id},{$inc:{numberInStock:-1}
    })
        .run();

    res.send(rental);
}catch(e){
    res.status(500).send('something failed');
}
});

router.get('/',async (req,res) =>{
    const rentals = await Rentals.find()
    .sort('-dateOut');

    res.send(rentals);
});

module.exports = router;
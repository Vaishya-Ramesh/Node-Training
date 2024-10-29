const {Rental,validateRental}=require('../models/rental')
const {Movie}=require('../models/movie');
const {Customer}=require('../models/customer');
const express=require('express');
const router=express.Router();
router.use(express.json());

router.post('/',async (req,res)=>{
    const {error}=validateRental(req.body);
    if(error)
    {
        return res.status(404).send(error.details[0].message);
    }
    const customer=await Customer.findById(req.body.customerId)
    if(!customer)
    {
        return res.status(400).send('Invalid customer');
    }
    const movie=await Movie.findById(req.body.movieId);
    if(!movie)
    {
        return res.status(400).send('Invalid Movie');
    }
    if(movie.numberInStock===0)
    {
        return res.status(400).send('Movie not in stock');
    }
    let newRental=new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate,
        }
    });
    const result=await newRental.save();

    movie.numberInStock--;
    movie.save();

    res.send(result);
});
router.get('/',async (req,res)=>
{
    const rentals=await Rental.find().sort('-dateOut');
    res.send(rentals);
});

module.exports=router;
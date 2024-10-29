const {Movie,validateMovies}=require('../models/movie')
const {Genre}=require('../models/genres')
const express=require('express');
const router=express.Router();
router.use(express.json());

router.post('/',async (req,res)=>{
    const {error}=validateMovies(req.body);
    if(error)
    {
        return res.status(404).send(error.details[0].message);
    }
    const genre=await Genre.findById(req.body.genreId);
    if(!genre){
        return res.status(400).send('Invalid genre.');
    }
    const movie=new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    const result=await movie.save();
    res.send(result);
});
router.get('/',async (req,res)=>
{
    const allMovies=await Movie.find().sort('name');
    res.send(allMovies);
});
router.get('/:id',async (req,res)=>{
    const movie=await Movie.findById(req.params.id);
    if(!movie)
    {
        return res.status(404).send("The customer with given id is not available");
    }
    res.send(movie);
});

router.put('/:id',async (req,res)=>{
    const {error}=validateMovies(req.body);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }
    const genre=await Genre.findById(req.body.genreId);
    if(!genre){
        return res.status(400).send('Invalid genre.');
    }
    const movie=await Movie.findByIdAndUpdate(
        req.params.id,
        {title:req.body.title,
            genre:genre,
            numberInStock:req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate
        },
        {new:true
    });
    if(!movie)
    {
        return res.status(404).send("The movie with given id is not available");
    }
    res.send(movie);
    });

router.delete('/:id',async (req,res)=>{
    const movie=await Movie.findByIdAndDelete(req.params.id)
    if(!movie)
    {
        return res.status(404).send("The movie with given id is not available");
    }
    res.send(movie);
});

module.exports=router;
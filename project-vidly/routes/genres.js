const {Genre,validateGenres}=require('../models/genres')
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const express=require('express');
const router=express.Router();
router.use(express.json());

router.get('/',async (req,res,next)=>
{
    next(new Error("Could not get the Genres."));
    // const genres=await Genre.find().sort('name');
    // res.send(genres);
});
router.get('/:id',async (req,res)=>{
    const genre=await Genre.findById(req.params.id);
    if(!genre)
    {
        return res.status(404).send("The genre with given id is not available");
    }
    res.send(genre);
});

router.post('/',auth,async (req,res)=>{
    const {error}=validateGenres(req.body);
    if(error)
    {
        return res.status(404).send(error.details[0].message);
    }
    let newGenre=new Genre({
        name:req.body.name
    });
    const result=await newGenre.save();
    res.send(result);
});

router.put('/:id',async (req,res)=>{
    const {error}=validateGenres(req.body);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }
    const genre=await Genre.findByIdAndUpdate(
        req.params.id,
        {name:req.body.name},
        {new:true
    });
    if(!genre)
    {
        return res.status(404).send("The genre with given id is not available");
    }
    res.send(genre);
    });

router.delete('/:id',[auth,admin],async (req,res)=>{
    const genre=await Genre.findByIdAndDelete(req.params.id)
    if(!genre)
    {
        return res.status(404).send("The genre with given id is not available");
    }
    res.send(genre);
});
module.exports=router;
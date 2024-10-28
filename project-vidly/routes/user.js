const {User,validateUsers}=require('../models/user')
const express=require('express');
const router=express.Router();
router.use(express.json());

router.post('/',async (req,res)=>
{
    const {error}=validateUsres(req.body);
    if(error)
    {
        return res.status(404).send(error.details[0].message);
    }
    let user=await User.find({email:req.body.email});
    if(user)
    {
        return res.status(400).send('User already registered');
    }
    let newUser=new Genre({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const result=await newUser.save();
    res.send(result);
});

module.exports=router;
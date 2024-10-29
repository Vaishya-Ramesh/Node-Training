const bcrypt=require('bcrypt');
const _=require('lodash');
 const {User,validateUsers}=require('../models/user')
const express=require('express');
const router=express.Router();
router.use(express.json());

router.post('/',async (req,res)=>
{
    const {error}=validateUsers(req.body);
    if(error)
    {
        return res.status(404).send(error.details[0].message);
    }
    let user=await User.findOne({email:req.body.email});
    if(user)
    {
        return res.status(400).send('User already registered');
    }
    let newUser=new User(_.pick(req.body,['name','email','password']));
    const salt=await bcrypt.genSalt(10);
    newUser.password=await bcrypt.hash(newUser.password,salt);

    await newUser.save();
    res.send(_.pick(newUser,['_id','name','email']));
});

module.exports=router;
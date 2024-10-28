const {Customer,validateCustomers}=require('../models/customer')
const express=require('express');
const router=express.Router();
router.use(express.json());

router.post('/',async (req,res)=>{
    const {error}=validateCustomers(req.body);
    if(error)
    {
        return res.status(404).send(error.details[0].message);
    }
    let customer=new Customer({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    });
    const result=await customer.save();
    res.send(result);
});
router.get('/',async (req,res)=>
{
    const allCustomer=await Customer.find().sort('name');
    res.send(allCustomer);
});
router.get('/:id',async (req,res)=>{
    const customer=await Customer.findById(req.params.id);
    if(!customer)
    {
        return res.status(404).send("The customer with given id is not available");
    }
    res.send(customer);
});

router.put('/:id',async (req,res)=>{
    const {error}=validateCustomers(req.body);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }
    const customer=await Customer.findByIdAndUpdate(
        req.params.id,
        {name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
        },
        {new:true
    });
    if(!customer)
    {
        return res.status(404).send("The customer with given id is not available");
    }
    res.send(customer);
    });

router.delete('/:id',async (req,res)=>{
    const customer=await Customer.findByIdAndDelete(req.params.id)
    if(!customer)
    {
        return res.status(404).send("The genre with given id is not available");
    }
    res.send(customer);
});

module.exports=router;
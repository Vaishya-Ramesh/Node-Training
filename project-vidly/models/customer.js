const mongoose=require('mongoose');
const Joi=require('joi');

const customerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    phone:{
        type:Number,
        required:true
    },
    isGold:Boolean
});

const Customer=mongoose.model('Customer',customerSchema);

function validateCustomers(customer)
{
    const schema=Joi.object({
        name:Joi.string().min(3).max(50).required(),
        phone:Joi.number(),
        isGold:Joi.boolean()
    });
    return schema.validate(customer);
}

module.exports.Customer=Customer;
module.exports.validateCustomers=validateCustomers;
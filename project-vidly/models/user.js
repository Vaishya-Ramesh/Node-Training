const mongoose=require('mongoose');
const Joi=require('joi');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:3,
        maxlength:1024
    }
});

const User=mongoose.model('User',userSchema);


function validateUsers(user)
{
    const schema=Joi.object({
        name:Joi.string().min(3).required(),
        email:Joi.string().min(3).required().email(),
        password:Joi.string().min(3).required()
    });
    return schema.validate(user);
}

module.exports.User=User;
module.exports.validateUsers=validateUsers;
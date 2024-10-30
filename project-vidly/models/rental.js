const mongoose=require('mongoose');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);

const rentalSchema=new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name:{
                type:String,
                required:true,
                minlength:3,
                maxlength:50
            },
            phone:{
                type:String,
                match:/^\d{10}$/,
                required:true
            },
            isGold:Boolean
        }),
        required:true
    },
    movie:{
        type:new mongoose.Schema({
            title:{
                type:String,
                required:true,
                trim:true,
                minlength:3,
                maxlength:50
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0
            }
        }),
        required:true,
        dateOut:{
            type:Date,
            required:true,
            default:Date.now
        },
        dateReturned:Date,
        rentalFee:{
            type:Number,
            min:0
        }
    }
})
const Rental=mongoose.model('Rental',rentalSchema);
function validateRental(rental)
{
    const schema=Joi.object({
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required()
    });
    return schema.validate(rental);
}

module.exports.Rental=Rental;
module.exports.validateRental=validateRental;
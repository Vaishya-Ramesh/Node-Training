const mongoose=require('mongoose');
const Joi=require('joi');
const {genreSchema}=require('./genres');

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0
    }
});

const Movie=mongoose.model('Movie',movieSchema);

function validateMovies(movie)
{
    const schema=Joi.object({
        title:Joi.string().min(3).max(50).required(),
        genreId:Joi.objectId().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    });
    return schema.validate(movie);
}

module.exports.Movie=Movie;
module.exports.validateMovies=validateMovies;
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose=require('mongoose');
const genres=require('./routes/genres');
const customers=require('./routes/customer');
const movies=require('./routes/movie');
const users=require('./routes/user');
const express=require('express');
const app=express();
app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/users',users);

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log('Connected to mongoDB'))
    .catch(()=>console.error('Could not connect to MongoDB...'));

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening to port ${port}..`));
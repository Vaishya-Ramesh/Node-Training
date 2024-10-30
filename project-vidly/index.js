const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose=require('mongoose');
const genres=require('./routes/genres');
const customers=require('./routes/customer');
const movies=require('./routes/movie');
const rentals=require('./routes/rental');
const users=require('./routes/user');
const auth=require('./routes/auth');
const error=require('./middleware/error');
const config=require('config');
const express=require('express');
const app=express();
app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use(error);

if(!config.get('jwtPrivateKey')){
    console.log("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log('Connected to mongoDB'))
    .catch(()=>console.error('Could not connect to MongoDB...'));

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening to port ${port}..`));
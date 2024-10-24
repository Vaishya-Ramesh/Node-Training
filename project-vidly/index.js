const mongoose=require('mongoose');
const Joi=require('joi');
const express=require('express');
const app=express();
app.use(express.json());

mongoose.connect('mongodb://localhost/vidly')
    .then(()=>console.log('Connected to mongoDB'))
    .catch(()=>console.error('Could not connect to MongoDB...'));

const genreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    }
});

const Genre=mongoose.model('Genre',genreSchema);


function validateGenres(genre)
{
    const schema=Joi.object({
        name:Joi.string().min(3).required()
    });
    return schema.validate(genre);
}
app.post('/api/genres',async (req,res)=>{
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
app.get('/api/genres',async (req,res)=>
{
    const genres=await Genre.find().sort('name');
    res.send(genres);
});
app.get('/api/genres/:id',async (req,res)=>{
    const genre=await Genre.findById(req.params.id);
    // const genre=genres.find(c=>c.id===parseInt(req.params.id));
    if(!genre)
    {
        return res.status(404).send("The genre with given id is not available");
    }
    res.send(genre);
});

app.put('/api/genres/:id',async (req,res)=>{
    // const genre=genres.find(c=>c.id===parseInt(req.params.id));
    if(!genre)
    {
        return res.status(404).send("The genre with given id is not available");
    }
    const genre=Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{
        new:true
    })
    const {error}=validateGenres(req.body);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }
    res.send(genre);
});

app.delete('/api/genres/:id',async (req,res)=>{
    const genre=await Genre.findByIdAndRemove(req.params.id)
    // const genre=genres.find(c=>c.id===parseInt(req.params.id));
    if(!genre)
    {
        return res.status(404).send("The genre with given id is not available");
    }
    res.send(genre);
});

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening to port ${port}..`));
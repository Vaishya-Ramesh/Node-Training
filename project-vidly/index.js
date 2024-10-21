const Joi=require('joi');
const express=require('express');
const app=express();
app.use(express.json());

const genres=[
    {id:1,type:'Horror'},
    {id:2,type:'Comedy'}
]

function validateGenres(genre)
{
    const schema=Joi.object({
        type:Joi.string().min(3).required()
    });
    return schema.validate(genre);
}
app.post('/api/genres',(req,res)=>{
    const {error}=validateGenres(req.body);
    if(error)
    {
        return res.status(404).send(error.details[0].message);
    }
    const genre={
        id:genres.length+1,
        type:req.body.type
    }
    genres.push(genre);
    res.send(genre);
});
app.get('/api/genres',(req,res)=>
{
    res.send(genres);
});
app.get('/api/genres/:id',(req,res)=>{
    const genre=genres.find(c=>c.id===parseInt(req.params.id));
    if(!genre)
    {
        return res.status(404).send("The genre with given id is not available");
    }
    res.send(genre);
});

app.put('/api/genres/:id',(req,res)=>{
    const genre=genres.find(c=>c.id===parseInt(req.params.id));
    if(!genre)
    {
        return res.status(404).send("The genre with given id is not available");
    }
    const {error}=validateGenres(req.body);
    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }
    genre.type=req.body.type;
    res.send(genre);
});

app.delete('/api/genres/:id',(req,res)=>{
    const genre=genres.find(c=>c.id===parseInt(req.params.id));
    if(!genre)
    {
        return res.status(404).send("The genre with given id is not available");
    }
    const index=genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
});

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening to port ${port}..`));
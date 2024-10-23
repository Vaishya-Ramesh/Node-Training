const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err=>console.error('Could not connect to MongoDB...',err));

const courseSchema=new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:{type:Date,default:Date.now},
    isPublished:Boolean
});

const Course=mongoose.model('Course',courseSchema);
async function createCourse(){
const course=new Course({
    name:'Angular Course',
    author:'Vaishya',
    tags:['Angular','frontend'],
    isPublished:true
});
const result=await course.save();
console.log(result);
}

async function getCourse(){
    const pagenumber=2;
    const pageSize=10;

    const courses=await Course
    // .find({price:{$gte:10,$lte:20}})
    // .skip((pagenumber-1)*pageSize)
    // .limit(pageSize)
    .find({isPublished:true})
    .sort({name:1})
    .select({name:1,tags:1});
    console.log(courses);
}

getCourse();
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err=>console.error('Could not connect to MongoDB...',err));

const courseSchema=new mongoose.Schema({
    name:{type:String,
        required:true,
        minlength:5,
        maxlength:255},
    author:String,
    tags:{
        type:Array,
        validate:{
            validator: async function (v){
                return new Promise((resolve)=>{
                setTimeout(()=>{
                    resolve(v && v.length>0);
                },4000);
            });
            },
            message:'A course should have atleast one value'
        }
    },
    category:{
        type:String,
        enum:['web','mobile','network'],
        lowercase:true,
        trim:true
    },
    date:{type:Date,default:Date.now},
    isPublished:Boolean,
    Price:{
        type:Number,
        required:function(){return this.isPublished;},
        min:10,
        max:50000,
        get:v=>Math.round(v),
        set:v=>Math.round(v)
    }
});

const Course=mongoose.model('Course',courseSchema);
async function createCourse(){
const newCourse=new Course({
    name:'New Course',
    author:'New Author',
    tags:['New'],
    isPublished:true,
    Price:1000.9
});
try{
    // await newCourse.validate();
    const result=await newCourse.save();
    console.log(result);
}
catch(e)
{
    // for(field in e.errors)
    // {
    //     console.log(e.errors[field].message);
    // }
    console.log(e.message);
}
}
createCourse();

/*
async function getCourse(){
    const pagenumber=2;
    const pageSize=10;

    const courses=await Course
    .find({price:{$gte:10,$lte:20}})
    .skip((pagenumber-1)*pageSize)
    .limit(pageSize)
    .find({isPublished:true})
    .sort({name:1})
    .select({name:1,tags:1});
    console.log(courses);
}*/
async function getCourse(){
    const courses=await Course.find();
    console.log('Courses:\n',courses);
}
// getCourse();

async function updateCourse(id){
    const course=await Course.findById(id);
    if(!course) return;
    course.set({
        name:'MongoDB Course',
        Price:1500
        // isPublished:true,
        // author:'Another Author'
    });
    try{
    const result=await course.save();
    console.log('Updated Course:\n',result);
    }
    catch(e)
    {
        console.log(e.message);
    }
}
// updateCourse('6719ec626e8220ed460502da');


async function removeCourse(){
    const result=await Course.deleteMany({tags:[]});
    console.log(result);
}
// removeCourse();
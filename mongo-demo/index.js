const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err=>console.error('Could not connect to MongoDB...',err));

const courseSchema=new mongoose.Schema({
    _id:{type:String,
        required:true},
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
    _id:'CustomId2222',
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
// createCourse();


// async function getCourse(){
//     const pagenumber=2;
//     const pageSize=5;

//     const courses=await Course
//     .find()
//     .skip((pagenumber-1)*pageSize)
//     .limit(pageSize)
//     console.log(courses);
// }
// getCourse();

async function getCourse(){
    const courses=await Course.findById('5a68fe2142ae6a6482c4c9cb');
    console.log('Courses:\n',courses);
}
getCourse();

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
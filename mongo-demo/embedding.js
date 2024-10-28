const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors:[authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find()
  // .select('-_id');
  console.log(courses);
}

async function updateAuthor(courseId){
  const course=await Course.findById(courseId);
  course.authors.name='Vaishya'
  course.save();
}
// updateAuthor('671f145b038790ad69bb9f94');
listCourses();

async function addAuthor(courseId, author){
  const course=await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function deleteAuthor(courseId, authorId){
  const course=await Course.findById(courseId);
  course.authors.pull({_id:authorId});
  course.save();
}
deleteAuthor('671f21302d5f78dbbd6209e7','671f240c02f5ac0e723a3215');
// addAuthor('671f21302d5f78dbbd6209e7',new Author({name:'Lakshitha'}))

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }),
//   new Author({ name: 'Vaishya' })
// ]);

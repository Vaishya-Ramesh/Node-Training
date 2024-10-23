const p1=new Promise((resolve)=>{
    console.log("Before");
    setTimeout(()=>{
        console.log('Async operation 1...');
        resolve(1);
    },2000);
});
const p2=new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('Async operation 2...');
        resolve(2);
    },2000);
});
const p3=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('Async operation 3...');
        resolve(3);
        //reject(new Error("Somehow got rejected"));
    },2000);
});

const p=Promise.all([p1,p2,p3])
    .then(result=>console.log(result))
    .catch(err=>console.log(err.message));
console.log(p);
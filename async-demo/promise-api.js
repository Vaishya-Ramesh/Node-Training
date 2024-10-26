const p1=new Promise((resolve)=>{
    console.log("Inside p1");
    setTimeout(()=>{
        console.log('Async operation 1...');
        resolve(1);
        // reject(new Error("Somehow got rejected 1"));
    },1000);
});
const p2=new Promise((resolve)=>{
    console.log("Inside p2");
    setTimeout(()=>{
        console.log('Async operation 2...');
        resolve(2);
        // reject(new Error("Somehow got rejected 2"));
    },1000);
});
const p3=new Promise((resolve,reject)=>{
    console.log("Inside p3");
    setTimeout(()=>{
        console.log('Async operation 3...');
        resolve(3);
        // reject(new Error("Somehow got rejected 3"));
    },1000);
});

async function log(){
const p=Promise.all([p1,p3,p2])
    .then((result)=>{
        //console.log(result);
        return result;})
    .catch(err=>console.log(err.message));
    const res=await p;
    console.log(res);
}
async function run()
{
    await log();
    console.log("Last");
}
run();
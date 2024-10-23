/*
console.log('Before');
getUser(1,(obj)=>{
    //console.log(`User:${JSON.stringify(obj)}`);
    console.log('User:',obj);
    getRepo((repos)=>{
        console.log('Repos:',repos);
    });
    getDetails(obj.gitHubUsername,(details)=>{
        console.log('Details:',details);
    });
});
console.log('After'); 
function getUser(id,callback){
    setTimeout(()=>{
        console.log('Reading a user from database...');
        callback ({ id:id,gitHubUsername:'Vaishya'});
    },2000);
}
function getRepo(callback)
{
    setTimeout(()=>{
        callback(['repo1','repo2','repo3']);
    },1000);
}
function getDetails(gitHubUsername,callback)
{
    setTimeout(()=>{
        let detail=[
            {name:'Vaishya',details:'KEC'},
            {name:'Lakshitha',details:'Sona'}
        ]
        let user;
        for(let i=0; i<detail.length; i++) {
            if (detail[i].name===gitHubUsername) {
                user=detail[i].details;
                break;
            }
    }
        callback(user);
    },1000);
}
---------------Replacing callbacks with Promises--------------
*/
// getUser(1, (user) => {
//     getRepositories(user.gitHubUsername, (repos) => {
//       getCommits(repos[0], (commits) => {
//         console.log(commits);
//       })
//     })
//   });
 
// getUser(1)
//     .then(user=>getRepositories(user.gitHubUsername))
//     .then(repos=>getCommits(repos[0]))
//     .then(commits=>console.log(commits))
//     .catch(err=>console.log('Error:',err.message));

// Using Async and Await
async function displayCommits(){
    try{
        const user=await getUser(1);
        const repos=await getRepositories(user.gitHubUsername);
        const commits=await getCommits(repos[0]);
        console.log(commits);
    }
    catch(err)
    {
        console.log(err.message);
    }
}
displayCommits();

  function getUser(id) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'Vaishya' });
        }, 2000);
    });
    
  }
  
  function getRepositories(username) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
        console.log('Calling GitHub API...');
        resolve(['repo1', 'repo2', 'repo3']);
        //reject(new Error('Could not get repos'));
        }, 2000);
    });
  }
  
  function getCommits(repo) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
        console.log('Calling GitHub API...');
        resolve(['commit']);
        }, 2000);
    });
  }


console.log(__filename);
console.log(__dirname);

function print(msg)
{
    console.log(`Welcome ${msg}`);
}

function sayHello()
{
    console.log("Hello");
}

module.exports={
    sayHello:sayHello,
    print:print
};

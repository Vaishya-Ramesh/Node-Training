const lib=require('../exercise1');
describe('fizzBuzz',()=>{
    it('not a number',()=>{
        expect(()=>{lib.fizzBuzz('a')}).toThrow();
        expect(()=>{lib.fizzBuzz(null)}).toThrow();
        expect(()=>{lib.fizzBuzz(undefined)}).toThrow();
        expect(()=>{lib.fizzBuzz()}).toThrow();
    });
    it('div by both 3 and 5',()=>{
        const result=lib.fizzBuzz(15);
        expect(result).toEqual('FizzBuzz');
    });
    it('div by only 3',()=>{
        const result=lib.fizzBuzz(3);
        expect(result).toEqual('Fizz');
    });
    it('div by only 5',()=>{
        const result=lib.fizzBuzz(5);
        expect(result).toEqual('Buzz');
    });
    it('not div by both 3 or 5',()=>{
        const result=lib.fizzBuzz(1);
        expect(result).toEqual(1);
    });
});
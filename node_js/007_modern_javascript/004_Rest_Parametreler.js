//ES5
/*function sum(){
    let arr = Array.prototype.slice.call(arguments);
    let result = 0;
    arr.array.forEach(function(a){
        result += a;
        console.log(a);
    });
    return result;
}*/

//ES6
let sum = (...arr)=>{
    let result = 0;
    arr.forEach(a=>result+=a);
    return result;
}
console.log(sum(10,20,30));

let isDriver = (...years)=>{
    years.forEach(year=>console.log(2021 - year >= 18));
}

isDriver(1994, 2005, 2001, 2009, 2017);
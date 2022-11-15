let a, b, rest;
[a, b] = [10,20];
console.log(a + ' ' + b);
[a, b, ...rest] = [10, 20, 30,40,50,60];
({a, b} = {a: 10, b: 20});
({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});


//ES5
const arrConfig = ['localhost','8080','123'];
/*const server = arrConfig[0];
const port = arrConfig[1];
const timeout = arrConfig[2];*/

//ES6
const[server, port, timeout] = arrConfig;

//ES5
const objConfig = {
    server: 'localhost',
    port: '8080',
    timeout: 900
}
/*const server = objConfig.server;
const port = objConfig.port;
const timeout = objConfig.timeout;*/


//ES6
const{server, port, timeout} = objConfig;

let{timeout: t} = objConfig;//objConfig'in içinden timeout'u t'nin içine atar timeout'un içine atmaz!

const objConfig = {
    server: 'localhost',
    port: '8080'
}
const{server, port, timeout=900} = objConfig;

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const[,,wed,,fri] = days;
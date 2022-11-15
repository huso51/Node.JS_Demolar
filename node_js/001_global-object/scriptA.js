// let firstName = 'Hüseyin';
// console.log(firstName);
// console.log(window);

// let controllerA = (function() {
//    let abc = "Hüseyin"; 
//    let log = function(){
//        console.log(this.abc);
//    }
//    return {
//     abc,
//     log
//    };
// })();

//private members
//var age =;

/*(function (exports, require, module, __filename, __dirname) {
    //public members
    console.log(__dirname);
    console.log(__filename);
    var firstName = "Hüseyin";
    var log = function (name) {
        console.log(name);
    }
    /*module.exports.firstName = firstName;
    module.exports.log = log;*/
/* exports = {
     log: log,
     firstName: firstName
 };
})();*/
console.log(__dirname);
console.log(__filename);
var firstName = "Hüseyin";
var log = function (name) {
    console.log(name);
}
/*module.exports.firstName = firstName;
module.exports.log = log;*/
module.exports = {
    log: log,
    firstName: firstName
};

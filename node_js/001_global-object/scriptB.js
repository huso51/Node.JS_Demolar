// let lastName = 'Aydın';
// console.log(lastName);

// let controllerB = (function() {
//     let abc = "Hüseyin"; 
//     let log = function(){
//         console.log(this.abc);
//     }
//     return {
//         abc,
//         log
//     };
//  })();

const scriptA = require('./scriptA');
scriptA.log('Selam');
console.log(scriptA.firstName);
function getTotal(a, b, c){
    return a + b + c;
}
console.log(getTotal(10,20,30));

let numbers = [10, 20, 20];

//ES5
console.log(getTotal.apply(null, numbers));

//ES6
console.log(getTotal(...numbers));

let arr1 = ['one','two'];
let arr2 = ['tree','four'];

arr1.push(...arr2); //arr1'in sonuna arr2'yi ekler
arr1.unshift(...arr2); //arr1'in başına arr2'yi ekler

let arr3 = ['one' ,...arr1, 'two', ...arr2];

let h1 = document.querySelector('h1');
let divs = document.querySelectorAll('div');

let tags = [h1, ...div];
tags.forEach(t=>t.style.color = 'red');
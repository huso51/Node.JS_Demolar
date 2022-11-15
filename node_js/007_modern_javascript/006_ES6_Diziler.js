const boxes = ['Hüseyin','Rümeysa','Yasin','Ömer Faruk'];
//ES5
/*let boxesES5 = Array.prototype.splice.call(boxes);
boxesES5.forEach(element => {
    console.log(element);
});*/

//ES6
Array.from(boxes).forEach(element=>console.log(element));

//ES5
for(let i = 0; i < boxes.length; i++){
    console.log(boxes[i]);
}

//ES6
for(let box of boxes){
    console.log(box);
}

const products = [
    {name: 'Lenovo', price: 2500},
    {name: 'Asus', price: 1500},
    {name: 'Apple', price: 30000},
];
console.log(Array.from(products,pr=>pr.name == 'Lenovo'));
console.log(products.find(pr=>pr.name == 'Lenovo'));
console.log(products.filter(pr => pr.price >= 2500));
console.log(products.findIndex(pr => pr.price == 2500));

let numbers = [10,20,30,40];
let entries = numbers.entries();// map harita
for(let entry of entries){
    console.log(entry);
}

let keys = numbers.keys(); //keys anahtarlar
for(let key of keys){
    console.log(key);
}

let values = numbers.values();//values değerler
for(let value of values){
    console.log(value);
}
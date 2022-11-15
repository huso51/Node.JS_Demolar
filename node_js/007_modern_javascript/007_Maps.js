const numbers = new Map();
numbers.set('1','bir');
numbers.set('2','iki');
numbers.set('3','üç');

let val = numbers.get('1');
console.log(numbers.size);
val = numbers.has('1');
/*numbers.delete('1');
numbers.clear();*/
console.log(val);

for(let[key,value] of numbers){
    console.log(key + ' ' + value);
}


for(let[key,value] of numbers.entries()){
    console.log(key + ' ' + value);
}


for(let key of numbers.keys()){
    console.log(key);
}

for(let value of numbers.values()){
    console.log(value);
}

numbers.forEach((key, value) =>{
    console.log(key + ' ' + value);
})

let first = new Map([
    [1,'bir'],
    [2, 'iki'],
    [3, 'üç']
]);

let second = new Map([
    [4, 'dört'],
    [5, 'beş']
]);

let merged = new Map([...first, ...second]);
console.log(merged);
merged.forEach((key, value) =>{
    console.log(key + ' ' + value);
})

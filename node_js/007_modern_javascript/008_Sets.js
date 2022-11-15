let mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(2); //2'yi tekrar eklemez
mySet.add({a: 1, b: 2});

let obj = {
    a: 1,
    b: 2
}

mySet.add(obj); //obj'yi ekler çükü referansları farklı
console.log(mySet.has(1));
mySet.delete(1);

for(let item of mySet){
    console.log(item);
}

for(let[key, value] of mySet.entries()){
    console.log(key + ' ' + value);
}

for(let item of mySet.keys()){
    console.log(item);
}

for(let item of mySet.values()){
    console.log(item);
}

console.log(Array.from(mySet));//myset'i direk diziye çevirdik

let youSet = new Set([1,2,3,4,5,6]);
console.log(youSet);

//mySet ile youSet'in kesişen yani birbirine uyan kısımları
//let intersect = new Set(Array.from(mySet).filter(item=>mySet.has(item)));
let intersect = new Set([...mySet].filter(item=>youSet.has(item)));

//mySet ile youSet'in kesişmeyen yani birbirine uymayan kısımları
let difference = new Set([...mySet].filter(item=>!youSet.has(item)));
//ES5

let PersonES5 = function (name, surname, dateOfBirth) {
    this.name = name;
    this.surname = surname;
    this.dateOfBirth = dateOfBirth;
}

PersonES5.prototype.calculateAge = function () {
    return 2021 - this.dateOfBirth;
}

let person = new PersonES5('Hüseyin', 'Aydın', 1994);
console.log(person.calculateAge());

//ES6
class PersonES6 {
    constructor(name, surname, dateOfBirth) {
        this.name = name;
        this.surname = surname;
        this.dateOfBirth = dateOfBirth;
    }

    calculateAge = () =>{
        return 2021 - this.dateOfBirth;
    }

    static hi = ()=>{
        console.log('Selamun Hi!');
    }
}

person = new PersonES6('Hüseyin', 'Aydın', 1994);
console.log(person.calculateAge());
PersonES6.hi();

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    static distance(a, b){
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.hypot(dx, dy);
    }
}

let d1 = new Point(10,10);
let d2 = new Point(20,20);

console.log(Point.distance(d1, d2));
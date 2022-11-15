/*function PersonES5(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}
PersonES5.prototype.sayHi = function(){
    return `Merhaba dünyalı ${this.firstName} ${this.lastName}`;
}
function CustomerES5(firstName, lastName, phone, userName){
    PersonES5.call(this,firstName,lastName);
    this.phone = phone;
    this.userName = userName;
}
CustomerES5.prototype = Object.create(PersonES5.prototype);
let customer = new CustomerES5('Hüseyin','Aydın',55,'huso');
console.log(customer.sayHi());*/

class Person{
    constructor(name, surname){
        this.name = name;
        this.surname = surname;
    }

    sayHello(){
        return `Merhaba dünyalı ${this.name} ${this.surname}`;
    }

    static hi(){
        console.log('Hi');
    }
}

class Customer extends Person{
    constructor(name, surname, phone, username){
        super(name, surname);
        this.phone = phone;
        this.username = username;
    }


}

let customer = new Customer('Hüseyin','Aydın',55,'huso');
console.log(customer.sayHello());
Customer.hi();
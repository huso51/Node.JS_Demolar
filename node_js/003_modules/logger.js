const EventEmitter = require('events');
const emitter = new EventEmitter();

class Logger extends EventEmitter{
    log(message){
        console.log(message);
        this.emit("abc",{id:1, message: "Hello"});
    }
}

module.exports = Logger;
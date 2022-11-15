const EventEmitter = require('events');
const emitter = new EventEmitter();

const Logger = require('./logger');
const logger = new Logger();

emitter.on("connection",()=>{
    console.log("Bağlantı kuruldu");
});
emitter.emit("connection");


emitter.on("connection_close",(param1, param2)=>{
    console.log("Bağlantı koptu " + param1 + " " + param2);
});
emitter.emit("connection_close",1,"Hello");

emitter.on("connection_close2",(obj)=>{
    console.log("Bağlantı koptu " + obj.id + " " + obj.message);
});
emitter.emit("connection_close2",{id:1, message: "Hello"});

logger.on("abc",(obj)=>{
    console.log("abc " + obj.id + " " + obj.message);
});

logger.log("Selam");
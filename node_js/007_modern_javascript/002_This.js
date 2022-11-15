//ES5
let list = {
    category: 'Phone',
    names: ['Telefon 1','Telefon 2','Telefon 3'],
    call : function(){
        let self = this;
        names.map(function(tel){
            console.log(tel)
            console.log(self.category);
        });
    }
}

//ES6
/*let list = {
    category: 'Phone',
    names: ['Telefon 1','Telefon 2','Telefon 3'],
    call : ()=>{
        names.map(tel=>{
            console.log(tel)
            console.log(this.category);
        });
    }
}*/

list.call();


//ES5
/*
function Game(){
    this.live = 0;
    this.addLive = function(){
        var self = this;
        this.oneUp = setInterval(function(){
            console.log(++this.live);
        },1000);
    }
}

let player = new Game();
player.addLive();
*/

//ES6

let player = ()=>{
    this.live = 0;
    this.addLive = ()=>{
        this.oneUp = setInterval(()=>{
            console.log(++this.live);
        },1000);
    }
}
player();

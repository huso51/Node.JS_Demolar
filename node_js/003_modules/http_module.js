const http = require('http');

const server = http.createServer((req,res)=>{
    console.log(req.url + " " + req.method);
    if(req.url === '/'){
        res.write("Selamun aleyküm hacı");
        res.end();
    }
    if(req.url === '/product'){
        res.write("Ürün listesi");
        res.end();
    }
});
server.listen(3000);
server.on("connection",()=>{
    console.log("Yeni bağlantı kuruldu");
});

console.log("3000. port dinleniyor!");
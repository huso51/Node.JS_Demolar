const http = require('http');
const fs = require('fs');
/*const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.statusCode = 200;
    res.statusMessage = "Ok";

    res.write("Hello World");
    res.end();
});*/

/*const server = http.createServer((req,res)=>{
    res.setHeader('Content-Type','application/json');
    res.statusCode = 200;
    res.statusMessage = "Ok";

    res.write(JSON.stringify({id: 1, name: "Hüseyin"}));
    res.end();
});*/

const server = http.createServer((req, res) => {
    fs.readFile('index2.html', (error, file) => {
        if (error) {
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 404;
            res.statusMessage = "Dosya bulunamadi";
            res.write("Dosya bulunamadı!");
            res.end();
        }
        else {
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.statusMessage = "Ok";
            res.end(file);
        }
    });
});
server.listen(3000);
console.log("3000. port dinleniyor!");
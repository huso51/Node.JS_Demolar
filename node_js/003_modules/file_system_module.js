const fs = require('fs');

const files = fs.readdir('./', (error, data)=>{
    if(error)
        console.log(error);
    else
        console.log(data);
});

const data = fs.readFile('data.txt', (error, data)=>{
    if(error)
        console.log(error);
    else
        console.log(data);
});

fs.writeFile('deneme.txt','Merhaba dünya', (error)=>{
    if(error)
        console.log(error);
    else
        console.log(data);
});

fs.appendFile('deneme.txt',' selam', (error)=>{
    if(error)
        console.log(error);
    else
        console.log(data);
});

fs.rename('deneme.txt','dene.txt',(error)=>{
    if(error)
    console.log(error);
else
    console.log("Dosya adı değiştirildi");
});

fs.unlink('deneme.txt',(error)=>{
    if(error)
        console.log(error);
    else
        console.log("Dosya silindi");
});
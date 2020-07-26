// Lucas Xavier Ebling Pereira - 10692183 
// Lucas Gabriel Mendes Miranda - 10265892
// Luís Fernando Martins Rodrigues de Araújo - 11275189 

//Criador do servidor, basicamente, "inicio"
/*
    Aqui meramente iniciamos o servidor em um port 
    Tudo que sera feito do express (a parte "carnuda")
    estara em app.js
*/

const app = require('./src/app');
const debug = require('debug');
const http = require('http');


const port = 3000;

app.set('port', port);


const server = http.createServer(app);

server.listen(port);
console.log('Server Operante\n');
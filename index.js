const http = require('http');
const url = require('url');
const fs = require('fs');
const crypto = require('crypto');

//modules
//const register = require('./register.js');
const ranking = require('./modules/ranking.js');
const register = require('./modules/register.js');
const join = require('./modules/join');

const hostname = 'twserver.alunos.dcc.fc.up.pt';
const port = 9110;

var nick = null;
var password = null;


const server = http.createServer((request, response) => {

  switch (request.method) {
    case 'POST':
      switch (request.url) {
        case '/register':
          let data = '';
          request.on('data', chunk => {
            data += chunk;
          })
          request.on('end', () => {
            //verificar valores
            let aux = JSON.parse(data);
            if(aux.nick !== undefined && aux.password !== undefined){
              let users = register(aux);
              nick = aux.nick;
              password = aux.password;

              users.then((message) => {
                response.writeHead(message.status, {"Acess-Control-Allow-Origin" : "*"});
                response.end(message.data);
                return;
              })
            }
            else{
              response.writeHead(400, {"Access-Control-Allow-Origin":"*"});
              aux.nick === undefined ? response.end(JSON.stringify({"error":"nick is not a valid string"})) : response.end(JSON.stringify({"error":"password is not a valid string"}));
            }
          })
          break;
        case '/ranking':
          let ranks = '';
          request.on('data', chunk => {
            ranks += chunk;
          })
          request.on('end', () =>{
            let rankings = ranking();
            rankings.then((messages) => {
              response.writeHead(messages.status, {"Access-Control-Allow-Origin":"*"});
              response.write(JSON.stringify(messages.body));
              response.end();
              return;
            })
          })
          response.writeHead(400);
          response.end;
          break;

        case '/join':
          let body = '';
          request.on('data', chunk => {
            body += chunk;
          })
          request.on('end', () => {
              let joingame = join(body, nick, password);

              joingame.then((data) => {
                  response.writeHead(data.stat, {"Access-Control-Allow-Origin": "*"});
                  response.end(JSON.stringify(data.msg));
              })
          })
          break;
        default:
          break;
      }
      break;

    case 'GET':
      break;


    default:
      response.writeHead(500);
      response.end();
      break;
  }
})

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

server.listen(port);
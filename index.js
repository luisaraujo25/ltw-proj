const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = 'twserver.alunos.dcc.fc.up.pt';
const port = 9110;


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
              fs.readFile('users.json',function(err,data) {
                if(! err) {
                  users = JSON.parse(data);
                  if(JSON.stringify(users) === '{}' || users[aux.nick] == undefined){
                    users[aux.nick] = {password: aux.password};
                    fs.writeFile('users.json', JSON.stringify(users), function (err) {
                      if (err) return console.log(err);
                    });
                  }
                    if(users[aux.nick].password === aux.password && users[aux.nick] !== undefined){
                      response.writeHead(200, {'Content-Type': 'application/json'});
                      response.end(JSON.stringify({}));
                    }
                    else if((users[aux.nick] !== undefined && users[aux.nick].password !== aux.password)){
                      response.writeHead(401, {'Content-Type': 'application/json'});
                      response.end(JSON.stringify({ "error": "User registered with a different password"}));
                    }
                    else{
                      response.writeHead(404, {'Content-Type': 'application/json'});
                      response.end();
                    }
                    response.end();
                }
              });
            }
            else{
              response.writeHead(400, {'Content-Type': 'application/json'});
              aux.nick === undefined ? response.end(JSON.stringify({"error":"nick is not a valid string"})) : response.end(JSON.stringify({"error":"password is not a valid string"}));
            }
          })
          break;
        case '/rankings':
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

server.listen(8008);

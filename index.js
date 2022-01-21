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
            fs.readFile('users.json',function(err,data) {
              if(! err) {
                  users = JSON.parse(data);
                  if(users.length === 0){
                    users.push(aux);
                    fs.writeFile('users.json', JSON.stringify(users), function (err) {
                      if (err) return console.log(err);
                    });
                  }
                  users.forEach(user => {
                    console.log(user.nick, user.password, aux.nick, aux.password);
                    if(aux.nick === user.nick && aux.password !== user.password){
                      console.log("TESTE");
                      response.writeHead(404, {'Content-Type': 'text/plain'});
                      response.end();
                    }
                    else if(user.nick === aux.nick && user.password === aux.password){
                      response.writeHead(200);
                      response.end();
                    }
                    else if(user.nick !== aux.nick){
                      users.push(aux);
                      fs.writeFile('users.json', JSON.stringify(users), function (err) {
                        if (err) return console.log(err);
                      });
                    }
                  });
              }
            });
            //verificar
            // console.log(aux.nick);
            // console.log(aux);
            // let newnick = aux.nick;
            // let obj = {`${newnick}`: {password:aux.password}};
            // console.log(obj);
            //response.end();
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

server.listen(8000);

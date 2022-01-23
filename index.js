const http = require('http');
const url = require('url');
const fs = require('fs');
const crypto = require('crypto');

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
                  if(JSON.stringify(users) === '{}' || users[aux.nick] === undefined){
                    var hashedPassword = crypto.createHash('md5').update(aux.password.toString()).digest('hex');
                    console.log(aux.password, hashedPassword);
                    users[aux.nick] = {password: hashedPassword};
                    fs.writeFile('users.json', JSON.stringify(users), function (err) {
                      if (err) return console.log(err);
                    });
                  }
                    if(users[aux.nick].password === hashedPassword && users[aux.nick] !== undefined){
                      response.writeHead(200, {'Content-Type': 'application/json'});
                      response.end(JSON.stringify({}));
                    }
                    else if((users[aux.nick] !== undefined && users[aux.nick].password !== hashedPassword)){
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
            let ranks = '';
            request.on('data', chunk => {
              ranks += chunk;
            })
            fs.readFile('rankings.json',function(err,data) {
              if(!err){
                try{
                  ranking_data = JSON.parse(data.toString());
                } catch (e){
                  ranking_data = [];
                }
                if(ranking_data.length < 10){
                  var list = {ranking : ranking_data};
                }
                else{
                  var list = {ranking : ranking_data.slice(0,10)};
                }
                response.writeHead(200, {"Access-Control-Allow-Origin":"*"});
                response.end(JSON.stringify(list));
              }
            });
          break;

        case '/join':
          let body = '';
          var gameId = null;
          request.on('data', chunk => {
            body += chunk;
          })
          request.on('end', () => {
            //verificar valores
            let auxgame = JSON.parse(body);
            if(auxgame.group !== undefined && auxgame.nick !== undefined && auxgame.password !== undefined && auxgame.size !== undefined && auxgame.initial !== undefined){
              fs.readFile('game.json',function(err,data) {
                if(! err) {
                  game_aux = JSON.parse(data);
                  gameId = crypto.createHash('md5').update(auxgame.group.toString()).digest('hex');
                  if(JSON.stringify(game_aux) === '{}' || game_aux[auxgame.group] === undefined){
                    console.log(auxgame.nick, gameId);
                    game_aux[auxgame.group] = {game: gameId};
                    console.log(game_aux);
                    fs.writeFile('game.json', JSON.stringify(game_aux), function (err) {
                      if (err) return console.log(err);
                    });
                  }
                    if(game_aux[auxgame.group].game === gameId && game_aux[auxgame.group] !== undefined){
                      response.writeHead(200, {'Content-Type': 'application/json'});
                      response.end(JSON.stringify({"game":gameId}));
                    }
                    else{
                      response.writeHead(401, {'Content-Type': 'application/json'});
                      response.end();
                    }
                    response.end();
                }
              });
            }
            else{
              response.writeHead(404, {'Content-Type': 'application/json'});
              //aux.nick === undefined ? response.end(JSON.stringify({"error":"nick is not a valid string"})) : response.end(JSON.stringify({"error":"password is not a valid string"}));
              response.end();
            }
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

server.listen(8000);

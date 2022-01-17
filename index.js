const http = require('http');


const hostname = 'twserver.alunos.dcc.fc.up.pt';
const port = 9110;


const server = http.createServer((request, response) => {
    if(request.url === '/register'){
        let data = '';
        request.on('data', chunk => {
          data += chunk;
        })
        request.on('end', () => {
          console.log(JSON.parse(data)); // 'Buy the milk'
          response.end();
        })
    }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
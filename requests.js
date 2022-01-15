const URL = "http://twserver.alunos.dcc.fc.up.pt:8008/";

const group = 150; // Número do grupo para emparelhamento para debugging (usem o vosso)

let nick     = null; // Nick do jogador
let password = null; // Pass do jogador
let size     = document.getElementById('num_cavidades_op').value; // Número de cavidades (sem armazéns)
let initial  = document.getElementById('num_sementes_op').value; // Número de sementes por cavidade
let gameId     = null; // Id do jogo
let players = document.getElementById('num_players_op').value;
let sse = null;

const nickInput = document.getElementById('username');
nickInput.addEventListener('change', (evt) => nick = evt.target.value);

const passwordInput = document.getElementById('password');
passwordInput.addEventListener('change', (evt) => password = evt.target.value);
  
const loginButton = document.getElementById('login');
loginButton.addEventListener('click', login);

const rankingButton = document.getElementById('scores');
rankingButton.addEventListener('click', getRankings);

const sizeInput = document.getElementById('num_cavidades_op');
sizeInput.addEventListener('change', (evt) => size = evt.target.value);

const initialInput = document.getElementById('num_sementes_op');
initialInput.addEventListener('change', (evt) => initial = evt.target.value);

const playButton = document.getElementById('refresh');
playButton.addEventListener('click', joinGame);

const numPlayers = document.getElementById('num_players_op');
numPlayers.addEventListener('change', (evt) => players = evt.target.value);


function startOnlineGame(){

  if(sse !== null && sse.readyState !== 2){
    sse.close();
  }

  sse = new EventSource(URL + "update?nick=" + nick + "&game=" + gameId);
  sse.onmessage = handleUpdate;
  showMessages("Awaiting remote player...");

}

function handleUpdate(msg){
  const message = JSON.parse(msg.data);
  console.log(message);
  if("board" in message){
    if("turn" in message.board){
      console.log(message.board);
      showMessages(`It's ${message.board.turn} turn to play`);
    }

    //funcçao que atualiza as sementes de acordo com o board recebido
  }
  if("winner" in message){
    showMessages(`${message.winner} wins!`);
    sse.close();
  }
}


function getRankings(){

    const ranking_url = URL + "ranking";
    const data = {};
    
    fetch(ranking_url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {

        console.log('Success:', data);
        // console.log(data.ranking[0].games);

    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function login(){

  const credentials = {nick, password};
  fetch(URL + 'register', {
    'method': 'POST',
		'body': JSON.stringify(credentials)
  })
  .then(response => response.json())
  .then((json) => showMessages(json))
  .catch(error => showMessages(error));
}


function joinGame(){
  //console.log(group + nick + password + size + initial); debug
  if(players == 2){
    if(nick && password){
      const config = {group, nick, password, size, initial};
      fetch(URL + 'join', {
        'method': 'POST',
        'body': JSON.stringify(config)
      })
      .then(response => response.json())
      .then((json) => {
        showMessages(json);
        if("game" in json){
          gameId = json.game;
          game();
        }
      })
      .catch(error => showMessages(error));
    }
    else {
      showMessages("Login and press 'Start");
    }
  }
  else {
    game();
  }
}

function leave(){
  const config = {nick, password, gameId};
  fetch(URL + 'leave', {
    'method': 'POST',
		'body': JSON.stringify(config)
  })
  .then(response => response.json())
  .then(jsonData => {
    if('error' in jsonData) {
      showMessages(jsonData.error);
    } else {
      showMessages('Leaving the game with ID: ', gameId);
    }
  })
  .catch(error => console.log(error));
}

function notify(move){
  const config = {nick, password, game: gameId, move}; //move -> id da cavidade
  //console.log(gameId);
  fetch(URL + 'notify', {
    'method': 'POST',
		'body': JSON.stringify(config)
  })
  .then(response => response.json())
  .then((json) => {
    console.log(json);
  })
  .catch(error => showMessages(error));
}

function showMessages(message) {
  const msgDiv = document.getElementById('messages');
  msgDiv.innerText = JSON.stringify(message);
}


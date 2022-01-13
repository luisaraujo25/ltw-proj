const URL = "http://twserver.alunos.dcc.fc.up.pt:8008/";

const group = 150; // Número do grupo para emparelhamento para debugging (usem o vosso)

let nick     = null; // Nick do jogador
let password = null; // Pass do jogador
let size     = document.getElementById('num_cavidades_op').value; // Número de cavidades (sem armazéns)
let initial  = document.getElementById('num_sementes_op').value; // Número de sementes por cavidade
let gameId     = null; // Id do jogo

const nickInput = document.getElementById('nick');
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
  .then(jsonData => {
    if('error' in jsonData) {
      showMessages(jsonData.error);
    } else {
      showMessages('Login successful!');
    }
  })
  .catch(error => console.log(error));
}

function joinGame(){
  console.log(group + nick + password + size + initial);
  const config = {group, nick, password, size, initial};
  fetch(URL + 'join', {
    'method': 'POST',
		'body': JSON.stringify(config)
  })
  .then(response => response.json())
  .then(jsonData => {
    if('error' in jsonData) {
      showMessages(jsonData.error);
    } else {
      gameId = jsonData.game;
      showMessages('New game created. ID: ', gameId);
    }
  })
  .catch(error => console.log(error));
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

// function notify(){
//   const config = {nick, password, gameId, move}; //move -> id da cavidade
//   fetch(URL + 'notify', {
//     'method': 'POST',
// 		'body': JSON.stringify(config)
//   })
//   .then(response => response.json())
//   .then(jsonData => {
//     if('error' in jsonData) {
//       showMessages(jsonData.error);
//     } else {
//       showMessages('Jogada válida');
//     }
//   })
//   .catch(error => console.log(error));
// }

function showMessages(message) {
  const msgDiv = document.getElementById('messages');
  msgDiv.innerText = message;
}


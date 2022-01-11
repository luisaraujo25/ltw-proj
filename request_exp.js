const url = "http://twserver.alunos.dcc.fc.up.pt:8008/";

async function getRankings(){

    const ranking_url = url + "ranking";
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

async function login(){

    const data = {nick: 'user16273', password: 'pass'};
    const login_url = url + "register";
    
    fetch(login_url, {
    method: 'POST',
    body: JSON.stringify(data)
    })
    .then((response) => response.json())
    //Then with the data from the response in JSON...
    .then((data) => {
    console.log('Success:', data);
    })
    //Then with the error genereted...
    .catch((error) => {
    console.error('Error:', error);
    });
}


getRankings();

login();
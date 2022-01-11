const url = "http://twserver.alunos.dcc.fc.up.pt:8008/";

async function getRankings(){

    const ranking = url + "ranking";
    const data = {};
    
    fetch(ranking, {
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

getRankings();
const url = "http://twserver.alunos.dcc.fc.up.pt:8008/";

// fetch(url);

const ranking = url + "ranking";

async function getRankings() {
    // let url = 'ranking.json';
    try {
        // let res = await fetch(url);
        let res = await fetch(ranking);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

const data = {};

fetch(ranking, {
  method: 'POST',
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
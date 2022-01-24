//used to deal where the seeds are distributed after reaching the cavity with the highest ID
function turn_around(no_cav_total, cav_ini_id, no_childs){

    var final_cav_id = cav_ini_id + no_childs;

    while(final_cav_id>no_cav_total){
        final_cav_id-=no_cav_total;
    }

    // console.log("c"+final_cav_id);

    return final_cav_id;
}

function check_end(total_cavs){
    
    //o jogo acaba quando pelo menos um dos jogadores já não tiver mais jogadas possíveis
    //verificar as cavidades de baixo
    var acc1=0, acc2=0;
    for(let i=1;i<=total_cavs/2-1;i++){
        acc1+=document.getElementById("c"+i).childNodes.length;
    }
    for(let i=total_cavs/2+1;i<=total_cavs-1;i++){
        acc2+=document.getElementById("c"+i).childNodes.length;
    }

    //se acabar verifica quem ganha
    if(!acc1 || !acc2){

        console.log("acabou");
        score();
        return true;
    }
    return false;
}

function score(){
    
    const total_cavs = document.getElementById("num_cavidades_op").value*2+2;
    
    console.log(total_cavs);
    var n_a1=document.getElementById("c"+(total_cavs/2)).childNodes.length;
    var n_a2=document.getElementById("c"+(total_cavs)).childNodes.length;
    
    console.log(n_a1);
    
    console.log(n_a2);
    removeElements();
    
    var winner="PLAYER ";
    if(n_a1>n_a2){
        winner+="1";
    }
    else if(n_a2>n_a1){
        winner+="2";
    }
    else{
        winner="EMPATE!";
    }

    let addHere = document.getElementById("addHere");

    const won = document.createElement("p");
    won.innerText = "Game ended! And the winner is......... " + winner + "!";

    addHere.appendChild(won);

   //checks if pl2 is bot
   let bot = isBot();
   if(bot){

        if(winner == "PLAYER 1"){
            let wins = localStorage.getItem("Human");
            wins++;
            localStorage.setItem("Human", wins);
        }
        else if(winner == "PLAYER 2"){
            let wins = localStorage.getItem("Bot");
            wins++;
            localStorage.setItem("Bot", wins);
        }
   }
}

function give_up(){

    //if we remove all cavities then their event listeners will be removed as well
    removeElements();

    let addHere = document.getElementById("addHere");
    let gaveUp = document.createElement("p");
    gaveUp.innerText = "You lost and gave up :(";
    addHere.appendChild(gaveUp);
}

//number of seeds per cavity
function getSem(cavityNumber){

    const no_sem = document.getElementById("c"+cavityNumber).childNodes.length;

    return no_sem;
}


function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max+1);
    return Math.floor(Math.random() * (max - min) + min);
}

function testRankings(){

    let list = document.getElementById("tab");

    while(list.hasChildNodes()){
        list.removeChild(list.childNodes[0]);
    }

    let data = "ola";
    let entry = document.createElement("li");
    entry.innerText = "ranking: "+ data;
    list.appendChild(entry);
}

function tableHead(){

    let list = document.getElementById("tab");
    let entry = document.createElement("tr");

    let name = document.createElement("th");
    name.innerText = "Nome:";

    let victories = document.createElement("th");
    victories.innerText = "Vitórias:";

    let games = document.createElement("th");
    games.innerText = "Jogos: ";

    entry.appendChild(name);
    entry.appendChild(victories);
    entry.appendChild(games);

    list.appendChild(entry);
}


function showLogout(){

    let loginForm = document.getElementById("login_form");
    loginForm.style.display = "none";

    let username = document.getElementById("username").value;
    let aux = document.createElement("p");
    aux.innerText = "Logged as " + username;
    let loggedUser = document.getElementById("loggedUser");
    loggedUser.appendChild(aux);
    loggedUser.style.display = "block";

    let logout = document.getElementById("logout");
    logout.style.display = "block";
}

function rankingsBot(){
    
    // localStorage.setItem("Bot",0);
    // localStorage.setItem("Human",0);
    // localStorage.setItem("Games",0);

    if (typeof(Storage) !== "undefined") {

        let table = document.getElementById("tab");
        //adds table headline
        tableHead();

        let games = document.createElement("th");
        games.innerText = localStorage.getItem("Games");

        let games2 = document.createElement("th");
        games2.innerText = localStorage.getItem("Games");

        let entry = document.createElement("tr");
        let name = document.createElement("th");
        let wins = document.createElement("th");
        name.innerText = "Human";
        wins.innerText = localStorage.getItem("Human");
        entry.appendChild(name);
        entry.appendChild(wins);
        entry.appendChild(games);
        table.appendChild(entry);


        let entry2 = document.createElement("tr");
        let name2 = document.createElement("th");
        let wins2 = document.createElement("th");
        name2.innerText = "Bot";
        wins2.innerText = localStorage.getItem("Bot");
        entry2.appendChild(name2);
        entry2.appendChild(wins2);
        entry2.appendChild(games2);
        table.appendChild(entry2);

    }
    else{
        console.log("This browser doesn't support WebStorage :(");
    }
}

function isBot(){

    let pl = document.getElementById("num_players_op").value;
    let bot = false;
    if(pl == "1") bot=true;
    return bot;
}
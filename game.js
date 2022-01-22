const TIMEOUT = 1000;

class Turn{
    
    constructor(pl1_turn){
        this.turn = pl1_turn;
    }

    getTurn(){
        return this.turn;
    }

    setTurn(pl1_turn){
        this.turn = pl1_turn;
    }

    manageTurn(last_cav, no_holes){
        
        //player 1 turn && its storage
        if(this.getTurn() && last_cav==no_holes/2){
            this.setTurn(true);   
        }
        //player 2 turn and its storage
        else if(!this.getTurn() && last_cav==no_holes){
            this.setTurn(false);
        }
        else{
            this.setTurn(!this.turn);
        }
    }
}

function checkException(lastCav, no_holes, t){

    //(...)-1 since after the play the last cavity will always have at least one seed
    let lastCavSem = document.getElementById("c"+lastCav).childNodes.length-1;
    let storage = no_holes;
    let belongsToPlayer = false;
    if(t.getTurn()){
        storage /= 2;
        if(lastCav < storage){
            belongsToPlayer = true;
        }
    }
    else{
        if(lastCav > storage/2){
            belongsToPlayer = true;
        }
    }
    
    if(!lastCavSem && belongsToPlayer){
        
        let opos_cav_num = no_holes-lastCav;
        let oposCav = document.getElementById("c"+opos_cav_num).childNodes;
        if(oposCav.length){
            setCavSem(storage,getSem(lastCav)+getSem(storage)+oposCav.length);
            removeSeeds(opos_cav_num);
            removeSeeds(lastCav);
        }
    }
}

function distribute(no_cav, t, no_holes, chosen_cavity){
    
    const cavity = document.getElementById("c"+chosen_cavity);
    let sementes = cavity.childNodes;
    let len = sementes.length;
    
    removeSeeds(chosen_cavity);
    
    let cav = chosen_cavity+1;
    for(let j=1;j<=len;j++){
        
        cav = chosen_cavity+j;
        //ver se dá a "volta"
        if(chosen_cavity+j>no_holes){
            cav = turn_around(no_holes, chosen_cavity, j);
        }
        
        let semN = getSemsNumber(cav);
        setCavSem(cav, semN+1);
    }
    checkException(cav, no_holes, t);
    if(check_end(no_holes)) return;
    display(no_holes);
    t.manageTurn(cav, no_holes);
}

function display(no_holes){

    let e = document.getElementById("delete");

    while(e.hasChildNodes()){
        e.removeChild(e.childNodes[0]);
    }

    for(let i=1;i<=no_holes;i++){
        // e.setAttribute("id","c"+i);
        let text = document.createTextNode("c"+i+": "+document.getElementById("c"+i).childNodes.length+", ");
        e.appendChild(text);
    }
}


function play(no_cav, t, no_holes, chosen_cavity, bot_level){
    
    if(t.getTurn()){
        
        if(document.getElementById("c"+chosen_cavity).childNodes.length){
            distribute(no_cav, t, no_holes, chosen_cavity);
        }
    }

    if(!t.getTurn()){
        chosen_cavity = choose_bot(bot_level);
        setTimeout(() => {distribute(no_cav, t, no_holes, chosen_cavity)},TIMEOUT);
    }    
}


function addEventListeners(no_cav, no_sem, pl1_turn, no_holes, bot, bot_level, first_move){

    //Checks if the player gave up
    document.getElementById("giveup").addEventListener("click", give_up);
    
    var t = new Turn(pl1_turn);

    display(no_holes);
    //adding every cavity a event listener
    for(let i=1;i<=no_cav;i++){
    
        document.getElementById("c"+i).addEventListener("click", function(){
            
            if(!bot){
                notify(i-1);
            }
            else{
                //BOT VS PLAYER
                play(no_cav,t,no_holes,i,bot_level);
            }
        });
    }

    //se estiver a jogar contra um bot e for o bot a fazer a primeira jogada
    if(bot && first_move){

        first_move = false;

        //while its still bot's start since the start of the game
        if(!pl1_turn){
            let chosen_cavity = choose_bot(bot_level);
            play(no_cav,t,no_holes,chosen_cavity,bot_level);
        }

    }
}

function game(){

    
    const no_cav = document.getElementById("num_cavidades_op").value;
    const no_sem = document.getElementById("num_sementes_op").value;
    const no_players = document.getElementById("num_players_op").value;
    const turn = document.getElementById("starting_op").value;
    const bot_level = document.getElementById("bot_level_op").value;
    //holes = cavities + storages
    const no_holes = no_cav*2+2; 
    
    addElements(no_cav, no_sem);

    var pl1_turn = true;
    if(turn == "player2"){
        pl1_turn = false;
    }
    
    var bot = false;
    if(no_players == "1"){
        bot = true;
    }
    else{
        startOnlineGame();
    }

    addEventListeners(no_cav, no_sem, pl1_turn, no_holes, bot, bot_level, true);
}


const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

open.addEventListener('click', () => {
    modal_container.classList.add('show');
});

close.addEventListener('click', () => {
    modal_container.classList.remove('show');
});
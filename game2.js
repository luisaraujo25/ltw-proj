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
        
        // var aux = document.getElementById(last_cav).childNodes.length-1;
        
        if(this.getTurn() && last_cav==no_holes/2){
            this.setTurn(true);   
        }
        else if(!this.getTurn() && last_cav==no_holes){
            this.setTurn(false);
        }
        else{
            this.setTurn(!this.turn);
        }
    }
}

function play(no_cav, t, no_holes, chosen_cavity){

    if(t.getTurn()){

        const cavity = document.getElementById("c"+chosen_cavity);
        let sementes = cavity.childNodes;
        let len = sementes.length;
    
        removeSeeds(chosen_cavity);

        for(let j=1;j<=len;j++){
    
            var cav = chosen_cavity+j;
            //ver se dá a "volta"
            if(chosen_cavity+j>no_holes){
                cav = turn_around(no_holes, chosen_cavity, j);
            }
    
            let semN = getSemsNumber(cav);
            setCavSem(cav, semN+1);
        }
        check_end(no_holes);
        t.manageTurn(cav, no_holes);
    }


    while(!t.getTurn()){

        chosen_cavity = choose_bot(false);

        const cavity = document.getElementById("c"+chosen_cavity);
        let sementes = cavity.childNodes;
        let len = sementes.length;
    
        removeSeeds(chosen_cavity);
        
        for(let j=1;j<=len;j++){
    
            var cav = chosen_cavity+j;
            //ver se dá a "volta"
            if(chosen_cavity+j>no_holes){
                cav = turn_around(no_holes, chosen_cavity, j);
            }
    
            let semN = getSemsNumber(cav);
            setCavSem(cav, semN+1);
        }
        check_end(no_holes);
        t.manageTurn(cav, no_holes);
    }    
}


function addEventListeners(no_cav, no_sem, pl1_turn, no_holes, bot, first_move){

    //Checks if the player gave up
    document.getElementById("giveup").addEventListener("click", give_up);
    
    var t = new Turn(pl1_turn);

    //adding every cavity a event listener
    for(let i=1;i<=no_cav;i++){
    
        document.getElementById("c"+i).addEventListener("click", function(){
            
            if(!bot){
                notify(i-1);
            }
            else{
                //BOT VS PLAYER
                play(no_cav,t,no_holes,i)
            }
        });
    }

    //se estiver a jogar contra um bot e for o bot a fazer a primeira jogada
    if(bot && first_move){

        first_move = false;

        //while its still bot's start since the start of the game
        while(!pl1_turn){
            let chosen_cavity = choose_bot(false);
            play(no_cav,t,no_holes,chosen_cavity);
        }

    }
}

function game(){

    
    const no_cav = document.getElementById("num_cavidades_op").value;
    const no_sem = document.getElementById("num_sementes_op").value;
    const no_players = document.getElementById("num_players_op").value;
    const turn = document.getElementById("starting_op").value;
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

    addEventListeners(no_cav, no_sem, pl1_turn, no_holes, bot, true);
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
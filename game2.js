//quando se remove um elemento removem-se os seus filhos, daí não necessitar de remover sementes (basta remover a cavidade)
function removeElements(){

    //14 é o num máx de cavidades por isso verifica todas (14=12 cavidades + 2 armazens)
    const max_cav=14;

    for(let i=1;i<=max_cav;i++){
        var c=document.getElementById("c"+i);

        if(c!=null){
            c.remove();
        }
    }
    //remover score
    var s = document.getElementById("result");
    if(s!=null){
        s.remove();
    }
}

function addElements(no_cav, no_sem){

    removeElements();
    
    //adicionar as cavidades adicionais, por default sao 3
    var no_cav = document.getElementById("num_cavidades_op").value;
    var no_sem = document.getElementById("num_sementes_op").value;

    //setId to storages
    var id_armazem2 = addStorage(add_cav,no_cav);

    for(let i=1;i<=add_cav;i++){
        addCav(i,no_cav);
    }
    //adicionar sementes a TODAS as cavidades (MAX C=12)
    // window.alert(no_cav);
    for(let i=1;i<=no_cav+1;i++){
        // window.alert(i);
        if(i==id_armazem2){
            continue;
        }

        for(let j=1;j<=no_sem;j++){
            addSem(i,j);
        }
    }
}

//não precisamos de atribuir ids às sementes
function addSem(cav_id, sem_id2) {
    
    var sem = document.createElement("div");
    sem.setAttribute("class","semente");
    document.getElementById("c"+cav_id).appendChild(sem);
}


function addCav(i,no_cav) {
    
    var cav = document.createElement("div");
    var cav2 = document.createElement("div");
    cav.setAttribute("class","cavidade");
    cav2.setAttribute("class","cavidade");
    document.getElementById('up_side').appendChild(cav);
    document.getElementById('down_side').appendChild(cav2);
    var id_up="c"+(no_cav+2-i), id_down="c"+i;
    cav.setAttribute("id", id_up);
    cav2.setAttribute("id", id_down);
}


function addStorage(add_cav,no_cav){
    
    var id_armazem2=+add_cav+1, id_armazem1=no_cav+2;

    var a1 = document.createElement("div");
    var a2 = document.createElement("div");

    a1.setAttribute("id","c"+id_armazem1); //direita
    a2.setAttribute("id","c"+id_armazem2); //esquerda

    a1.setAttribute("class","armazem");
    a2.setAttribute("class","armazem");

    document.getElementById("left_space").appendChild(a1);
    document.getElementById("right_space").appendChild(a2);
    // console.log(id_armazem1);

    return id_armazem2;
}

//number of seeds per cavity
function getSem(cavityNumber){

    const no_sem = document.getElementById("c"+cavityNumber).childNodes.length;

    return no_sem;
}

//updates board after being clicked
function updateBoard(clickedCav){

    var cavId = "c" + clickedCav;

    const element = document.getElementById(chosen_cavity);
    var sementes = element.childNodes;
        // window.alert(sementes.length);
        var len=sementes.length;
        for(let j=1;j<=len;j++){

            var x = "c"+(cavity_number+j);
            //ver se dá a "volta"
            if(cavity_number+j>total_cavs){
                var x = "c"+ turn_around(total_cavs, cavity_number, j);
            }

            // var x = "c" + turn_around(total_cavs,i,len);
            // window.alert(x);
            document.getElementById(x).appendChild(sementes[0]);
        }
}

function play(no_cav, no_sem, no_players, pl1_turn, no_holes, bot){


}


function addEventListeners(no_cav, no_sem, no_players, pl1_turn, no_holes, bot, first_move){

    //Checks if the player gave up
    document.getElementById("giveup").addEventListener("click", give_up);

    const storageRightNum = no_holes/2, storageLeftNum = no_holes;
    //adding every cavity a event listener
    for(let i=1;i<=no_cav;i++){
    
        document.getElementById("c"+i).addEventListener("click", function(){
               
            //notify -> update 
        });
    }

    //se estiver a jogar contra um bot e for o bot a fazer a primeira jogada
    if(bot && first_move){

        first_move = false;

        //while its still bot's start since the start of the game
        while(!pl1_turn){

            play(no_cav, no_sem, no_players, pl1_turn, no_holes, bot);
        }

    }
}

function game(){

    addElements();

    const no_cav = document.getElementById("num_cavidades_op").value;
    const no_sem = document.getElementById("num_sementes_op").value;
    const no_players = document.getElementById("num_players_op").value;
    const turn = document.getElementById("starting_op").value;
    //holes = cavities + storages
    const no_holes = no_cav*2+2; 

    var pl1_turn = true;
    if(turn == "player2"){
        pl1_turn = false;
    }

    var bot = false;
    if(no_players == "1"){
        bot = true;
    }


    addEventListeners(no_cav, no_sem, no_players, pl1_turn, no_holes, bot, true);
}

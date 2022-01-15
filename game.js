function give_up(){
    //if we remove all cavities then their event listeners will be removed as well
    removeElements();
}

function announce_winner(total_cavs){
    
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
        
        console.log("ganhei");
        score();
    }
}

function doSomething() {
    //do whatever you want here
    console.log("ESPEREI");
}

function after_clicking(chosen_cavity, cavity_number, valid_turn, total_cavs, pl1_turn, pl2_turn){

    if(pl1_turn){
        
        console.log("its me pl1");
        if(cavity_number>total_cavs/2){
            valid_turn=false;
        }
        else{
            valid_turn=true;
            pl1_turn=false;
            pl2_turn=true;
        }
    }
    else{
        console.log("its me pl2");
        if(cavity_number<total_cavs/2){
            valid_turn=false;
        }
        else{
            valid_turn=true;
            pl1_turn=true;
            pl2_turn=false;
        }   
    }
    
    const element = document.getElementById(chosen_cavity);

    if(element.hasChildNodes() && valid_turn==true){
                    
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
        //verificar se tem condições para jogar novamente - x[1] é só o número do ID da cavidade
        //se esta foi a jogada do pl1 então esta variavel já está com o valor false, se for para jogar novamente
        //muda-se o seu valor para true
        //as duas primeiras condições verificam se a ultima semente calhou no armazem - VERIFICA PRIMEIRO
        //as duas ultimas verficam se a ultima semente calhou numa das cavidades (vazia) do player que tem vez nesse momento
        //aux representa a cavidade em que "caiu" a última semente da jogadas
        var last_cav_num=x[1];
        if(x.length>2){
            last_cav_num+=x[2];
        }

        //(...)-1 since after the play the last cavity will always have at least one seed
        var aux = document.getElementById(x).childNodes.length-1;
        
        // console.log("LAST CAV NUM: "+last_cav_num);
        // console.log("NO_SEEDS: "+aux);
        if((pl1_turn==false && last_cav_num==total_cavs/2) || (pl2_turn==false && last_cav_num==total_cavs)){

            pl1_turn=!pl1_turn;
            pl2_turn=!pl2_turn;
        }
        else if((pl1_turn==false && last_cav_num<total_cavs/2 && !aux) || (pl2_turn==false && last_cav_num>total_cavs/2 && !aux)){
            
            console.log("tira todas");

            //declara opos_cav_num +/-total_cavs/2
            var opos_cav_num=total_cavs-last_cav_num;

            // console.log("c"+opos_cav_num);
            var opos_elem = document.getElementById("c"+opos_cav_num).childNodes;

            var armazem_number=total_cavs;
            if(pl1_turn==false){
                armazem_number/=2;
            }

            var armazem = document.getElementById("c"+armazem_number);
            var last_cav_elem = document.getElementById("c"+last_cav_num);
            
            if(document.getElementById("c"+opos_cav_num).hasChildNodes()){
                console.log("oposta tem filhos");
                armazem.appendChild(last_cav_elem.childNodes[0]);
            }
            
            const aux_len=opos_elem.length;
            for(let k=0;k<aux_len;k++){
                armazem.appendChild(opos_elem[0]);
            }
            //adicionar a ultima pedra da MINHA CAVIDADE ao meu armazem
        }
    }
    return {valid: valid_turn, pl1: pl1_turn, pl2: pl2_turn};
}

function do_play(bot, pl1_turn, pl2_turn, cavity_number){

    
    // console.log(cavity_number);

    const total_cavs = document.getElementById("num_cavidades_op").value*2+2;
    var chosen_cavity = "c"+cavity_number;
    //esta condição impede adicionar evenlisteners para os armazens
    

    //managing who plays
    
    // setTimeout(doSomething, 3000);
    // console.log(pl1_turn);
    var valid_turn = false;

    const value = after_clicking(chosen_cavity, cavity_number, valid_turn, total_cavs, pl1_turn, pl2_turn);
    
    //verificar se o jogo já chegou ao fim
    announce_winner(total_cavs);

    //the bot chooses and clicks on the cavity
    console.log("PL1: "+value.pl1 + ", PL2: "+value.pl2);
    if(bot && value.pl2){
        var cavity_number = myBot();
        // console.log("c"+cavity_number);
        document.getElementById("c"+cavity_number).click();
        // console.log("CLICK");
    }
    return value;
}

var value_turn;

function game(){

    addElements();
        
    document.getElementById("giveup").addEventListener("click", give_up);

    const total_cavs = document.getElementById("num_cavidades_op").value*2+2;

    const no_players = document.getElementById("num_players_op").value;

    //starting
    const player_starting = document.getElementById("starting_op").value;

    var pl1_turn = true;
    if(player_starting=="player2") pl1_turn=false;
    //o jogo por default começa com 2 jogadores -> PLAYER VS PLAYER
    var bot = false;
    //caso o utilizador mude o número players para 1 -> PLAYER VS BOT
    if(no_players == "1"){
        bot = true;
    }

    var cavity_number;
    var first_play = true;
    
    if(bot){
        const starting = document.getElementById("starting_op").value;
        var bot_starting = false;
        if(starting == "computador"){
            bot_starting = true;
        }
    }
    else{
        startOnlineGame();
    }

    //ADICIONAR EVENT LISTENERS
    for(let i=1;i<=total_cavs;i++){

        //verifica de o elementos existe
        if(document.getElementById("c"+i)!=null){
            
            document.getElementById("c"+i).addEventListener("click", function(){
                
                if(i==total_cavs/2 || i==total_cavs){
                    return;
                }

                if(first_play){
                    first_play = false;
                }
                else if(!first_play){
                    pl1_turn = value_turn.pl1;
                }
                console.log("ARMAZEM 1 " + document.getElementById("c4").childNodes.length);
                cavity_number = i;
                value_turn = do_play(bot, pl1_turn, !pl1_turn, cavity_number);
            });
        }
    }

    if(bot && !pl1_turn){
        cavity_number = myBot();
        document.getElementById("c"+cavity_number).click();
    }
}

function manage_turn(){

}
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

function after_clicking(chosen_cavity, i, valid_turn, total_cavs, pl1_turn, pl2_turn, valid_turn){
    
    console.log("C4: "+document.getElementById("c4").childNodes.length);
    const element = document.getElementById(chosen_cavity);

    if(element.hasChildNodes() && valid_turn==true){
                    
        var sementes = element.childNodes;
        // window.alert(sementes.length);
        var len=sementes.length;
        for(let j=1;j<=len;j++){

            var x = "c"+(i+j);
            //ver se dá a "volta"
            if(i+j>total_cavs){
                var x = "c"+ turn_around(total_cavs, i, j);
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
    return pl1_turn;
}

function game(){

    addElements();

    const total_cavs = document.getElementById("num_cavidades_op").value*2+2;

    const no_players = document.getElementById("num_players_op").value;

    var bot = false;

    if(no_players == "1"){
        bot = true;
    }

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

    //FAZER UMA JOGADA E ADICIONAR EVENT LISTENERS
    for(let i=1;i<=total_cavs;i++){

        var cav_no = "c"+i;
        // console.log("ola");
        //esta condição impede adicionar evenlisteners para os armazens
        if(i==total_cavs/2 || i==total_cavs){
            continue;
        }

        var pl1_turn=true, pl2_turn=false, valid_turn=false;

        //verifica de o elementos existe
        if(document.getElementById(cav_no)!=null){
            
            document.getElementById(cav_no).addEventListener("click", function(){

                var clicked_cav=this.id, id_num=clicked_cav[1];
                
                //caso cav_id >= c10
                if(clicked_cav.length>2){
                    id_num+=clicked_cav[2];
                }
                //managing who plays
                if(pl1_turn==true){
                    
                    console.log("its me pl1");
                    if(id_num>total_cavs/2){
                        valid_turn=false;
                    }
                    else{
                        valid_turn=true;
                        pl1_turn=false;
                        pl2_turn=true;
                    }
                }
                else if(pl2_turn==true){
                    
                    console.log("its me pl2");
                    if(id_num<total_cavs/2){
                        valid_turn=false;
                    }
                    else{
                        valid_turn=true;
                        pl1_turn=true;
                        pl2_turn=false;
                    }
                }
                var chosen_cavity;
                if(bot){
                    var chosen_cavity = myBot();
                    document.getElementById(chosen_cavity).click();
                    
                }
                else{
                    chosen_cavity = this.id;
                    console.log(chosen_cavity);
                }
                // console.log(chosen_cavity);
                
                // setTimeout(doSomething, 3000);
                const value = after_clicking(chosen_cavity, i, valid_turn, total_cavs, pl1_turn, pl2_turn, valid_turn);

                if(value == true){
                    pl1_turn = true;
                    pl2_turn = false;
                }
                else{
                    pl1_turn = false;
                    pl2_turn = true;
                }
                //verificar se o jogo já chegou ao fim
                announce_winner(total_cavs);
            });
        }
    }
    document.getElementById("giveup").addEventListener("click", give_up);
}

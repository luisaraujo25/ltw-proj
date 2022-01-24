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
    
    console.log(winner);

    const result = document.createElement("div");
    result.innerText = "Winner: " + winner;
    result.setAttribute("class","score_res");
    result.setAttribute("id","result")

    document.getElementById("tabuleiro").appendChild(result);

    document.getElementById("tabuleiro").removeEventListener("click",score);
}

function give_up(){
    //if we remove all cavities then their event listeners will be removed as well
    removeElements();
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


//THIS FILE HANDLES EVERYTHING ABOUT THE SCORES

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
}
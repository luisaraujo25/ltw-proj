// Botão Regras
const open = document.getElementById("open");
const regras_container = document.getElementById("regras_container");
const close = document.getElementById("close");

open.addEventListener("click", () => {
    regras_container.style.display = "flex";
});

close.addEventListener("click", () => {
    regras_container.style.display = "none";
});


function removeElements(){
    
    //14 é o num máx de cavidades por isso verifica todas (14=12 cavidades + 2 armazens)
    //6 é o num máx de sementes por isso verifica todas
    const max_cav=14;

    for(let i=1;i<=max_cav;i++){
        var c=document.getElementById("c"+i);

        // if(i==a1 || i==no_cav+2){
        //     console.log(i);
        //     continue;
        // }
        if(c!=null){

            //quando se remove um elemento removem-se os seus filhos?
            // for(let j=1;j<=6;j++){
            //     var s=document.getElementById("sem"+i+j);
            //     if(s!=null){
            //         s.remove();
            //     }
            // }
            c.remove();
        }
    }

}


//3 é o default number para cavidades
function addElements(){

    removeElements();
    
    //adicionar as cavidades adicionais, por default sao 3
    var add_cav = document.getElementById("num_cavidades_op").value;
    var no_sem = document.getElementById("num_sementes_op").value;
    const no_cav = add_cav*2;
    
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

function addSem(cav_id, sem_id2) {
    
    var sem = document.createElement("div");
    sem.setAttribute("class","semente");
    document.getElementById("c"+cav_id).appendChild(sem);
    //ex: sem_id="sem+1+1"
    var sem_id="sem"+cav_id+sem_id2;
    sem.setAttribute("id", sem_id);

    // window.alert("cav: "+cav_id+", sem: "+sem_id);
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

function give_up(){
    // window.alert("desisti?");
    removeElements();
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

        console.log("ganhei");
        document.getElementById("tabuleiro").addEventListener("click",score);
    }
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

    document.getElementById("tabuleiro").appendChild(result);

    document.getElementById("tabuleiro").removeEventListener("click",score);
}

function game(){
    
    addElements();

    var total_cavs=document.getElementById("num_cavidades_op").value*2+2;

    var end;
    //FAZER UMA JOGADA E ADICIONAR EVENT LISTENERS
    for(let i=1;i<=total_cavs;i++){

        var cav_no = "c"+i;
        // console.log("ola");
        //esta condição impede adicionar evenlisteners para os armazens
        if(i==total_cavs/2 || i==total_cavs){
            continue;
        }

        //verifica de o elementos existe
        if(document.getElementById(cav_no)!=null){
            
            document.getElementById(cav_no).addEventListener("click", function(){
                
                //verificar se o jogo já chegou ao fim
                check_end(total_cavs);
    
                if(this.hasChildNodes()){
            
                    var sementes = this.childNodes;
                    // window.alert(sementes.length);
                    var len=sementes.length;
                    for(let j=1;j<=len;j++){
    
                        var x = "c"+(i+j);
                        //ver se dá a "volta"
                        if(i+j>total_cavs){
                            var x = "c"+(i+j-total_cavs);
                        }
                        // window.alert(x);
                        document.getElementById(x).appendChild(sementes[0]);  
                    }
                }
            });
        }
    }

    document.getElementById("giveup").addEventListener("click", give_up);
}

function announce_winner(){
    console.log("yeet");
}

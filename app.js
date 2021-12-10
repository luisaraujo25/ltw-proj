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

// Variáveis
// var selectSementes = document.getElementById('num_sementes')
// // var nSementes = selectSementes.selectedIndex;
// nSementes = nSementes + 4;

// var selectCavidades = document.getElementById('num_cavidades')
// var nCavidades = selectCavidades.selectedIndex;
// nCavidades = nCavidades + 3;

// var selectPlayers = document.getElementById('num_players')
// var nPlayers = selectPlayers.selectedIndex;
// nPlayers = nPlayers + 1;

// var selectStart = document.getElementById('starting')
// var indexStart = selectStart.selected

// var TotalSementes = (nCavidades * nSementes)

function removeElements(){
    
    //12 é o num máx de cavidades por isso verifica todas
    //6 é o num máx de sementes por isso verifica todas
    for(let i=7;i<=12;i++){
        var c=document.getElementById("c"+i);

        if(c!=null){
            c.remove();
        }
        
    }
    for(let i=1;i<=12;i++){
        for(let j=1;j<=6;j++){
            var s=document.getElementById("sem"+i+j);
            if(s!=null){
                s.remove();
            }
        }
    }
}


//3 é o default number para cavidades
function addElements(){

    removeElements();

    //adicionar as cavidades adicionais, por default sao 3
    var add_cav = document.getElementById("num_cavidades_op").value-3;
    var no_sem = document.getElementById("num_sementes_op").value;
    for(let i=0;i<add_cav*2;i+=2){
        addCav(i);
    }

    //adicionar sementes a TODAS as cavidades (MAX 12)
    const no_cav = 6+add_cav*2
    for(let i=1;i<=no_cav;i++){
        for(let j=1;j<=no_sem;j++){
            addSem("c"+i,i,j);
        }
    }
}

function addSem(c_cav_id, cav_id, aux_id) {
    
    var sem = document.createElement("div");
    sem.setAttribute("class","semente");
    document.getElementById(c_cav_id).appendChild(sem);
    //ex: sem_id="sem+1+1"
    var sem_id="sem"+cav_id+aux_id;
    sem.setAttribute("id", sem_id);

    // window.alert("cav: "+c_cav_id+", sem: "+sem_id);
}


function addCav(i) {
    
    var cav = document.createElement("div");
    var cav2 = document.createElement("div");
    cav.setAttribute("class","cavidade");
    cav2.setAttribute("class","cavidade");
    document.getElementById('up_side').appendChild(cav);
    document.getElementById('down_side').appendChild(cav2);
    var id_up="c"+(7+i), id_down="c"+(8+i);
    cav.setAttribute("id", id_up);
    cav2.setAttribute("id", id_down);

}

var end=false;

function give_up(){
    // window.alert("desisti?");
    removeElements();
}

document.getElementById("giveup").addEventListener("click", give_up);
//game event listeners
// document.getElementById("scores").addEventListener("click", clicking_cav());

function game(){

    addElements();
}

function clicking_cav(){

    // window.alert("im here");
    var x = document.getElementById("c1");
    if(x.hasChildNodes()){

        var sementes = x.childNodes;
        // window.alert(sementes.length);
        var len=sementes.length;
        for(let i=0;i<len;i++){
            document.getElementById("c2").appendChild(sementes[0]);  
        }
    }
}

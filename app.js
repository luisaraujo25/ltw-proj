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
var selectSementes = document.getElementById('num_sementes')
var nSementes = selectSementes.selectedIndex;
nSementes = nSementes + 4;

var selectCavidades = document.getElementById('num_cavidades')
var nCavidades = selectCavidades.selectedIndex;
nCavidades = nCavidades + 3;

var selectPlayers = document.getElementById('num_players')
var nPlayers = selectPlayers.selectedIndex;
nPlayers = nPlayers + 1;

var selectStart = document.getElementById('starting')
var indexStart = selectStart.selected

var TotalSementes = (nCavidades * nSementes)


function addElements(no_sem, no_cav){

    for(let i=0;i<no_cav;i++){
        var id=addCav(i);
        
        for(let j=0;j<no_sem;j++){
            addSem(id);
        }
    }
}

function addSem(id) {
    
    var sem = document.createElement("div");
    sem.setAttribute("class","semente");
    document.getElementById(id).appendChild(sem);
}
//setattributeid

function addCav(i) {
    
    var cav = document.createElement("div");
    // var cav2 = document.createElement("div");
    cav.setAttribute("class","cavidade");
    // cav2.setAttribute("class","cavidade");
    document.getElementById('up_side').appendChild(cav);
    // document.getElementById('down_side').appendChild(cav2);
    var id="cav"+i;
    return id;
}

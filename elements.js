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

    addStorage(no_cav);
    let total = no_cav*2+2;

    for(let i=1;i<=no_cav;i++){
        addCav(i,no_cav);
        setCavSem(i,no_sem);
        setCavSem(total-i,no_sem);
    }
}


function addCav(i,no_cav) {
    
    var cav = document.createElement("div");
    var cav2 = document.createElement("div");
    cav.setAttribute("class","cavidade");
    cav2.setAttribute("class","cavidade");
    document.getElementById('up_side').appendChild(cav);
    document.getElementById('down_side').appendChild(cav2);
    var id_up="c"+(+no_cav*2+2-i), id_down="c"+i;
    cav.setAttribute("id", id_up);
    cav2.setAttribute("id", id_down);
}


function addStorage(no_cav){
    
    var id_armazem2=no_cav*2+2, id_armazem1=+no_cav+1;

    var a1 = document.createElement("div");
    var a2 = document.createElement("div");
    
    a1.setAttribute("id","c"+id_armazem1); //direita
    a2.setAttribute("id","c"+id_armazem2); //esquerda
    
    a1.setAttribute("class","armazem");
    a2.setAttribute("class","armazem");
    
    document.getElementById("right_space").appendChild(a1);
    document.getElementById("left_space").appendChild(a2);
}

function setCavSem(cav, numSeeds){

    removeSeeds(cav);
    for(let i=0; i<numSeeds; i++){
        var sem = document.createElement("div");
        sem.setAttribute("class","semente");
        sem.style.left = (Math.random() * (60 - 35) + 35) + "%";
        sem.style.top = (Math.random() * (60 - 30) + 30) + "%";
        sem.style.transform = "rotate("+ (Math.random() * (360)) +"deg)";
        document.getElementById("c"+cav).appendChild(sem);
    }
}

function removeSeeds(cav){
    let cavs = document.getElementById("c"+cav);
    while(cavs.hasChildNodes()){
        cavs.removeChild(cavs.childNodes[0]);
    }
}

function getSemsNumber(cav){
    return document.getElementById("c"+cav).childNodes.length;
}
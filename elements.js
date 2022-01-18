// //quando se remove um elemento removem-se os seus filhos, daí não necessitar de remover sementes (basta remover a cavidade)
// function removeElements(){

//     //14 é o num máx de cavidades por isso verifica todas (14=12 cavidades + 2 armazens)
//     const max_cav=14;

//     for(let i=1;i<=max_cav;i++){
//         var c=document.getElementById("c"+i);

//         if(c!=null){
//             c.remove();
//         }
//     }

//     //remover score
//     var s = document.getElementById("result");
//     if(s!=null){
//         s.remove();
//     }

// }


// //3 é o default number para cavidades
// function addElements(){

//     removeElements();
    
//     //adicionar as cavidades adicionais, por default sao 3
//     var no_cav = document.getElementById("num_cavidades_op").value;
//     var no_sem = document.getElementById("num_sementes_op").value;
//     const no_cav = add_cav*2;
    
//     //setId to storages
//     var id_armazem2 = addStorage(add_cav,no_cav);

//     for(let i=1;i<=add_cav;i++){
//         addCav(i,no_cav);
//     }
//     //adicionar sementes a TODAS as cavidades (MAX C=12)
//     // window.alert(no_cav);
//     for(let i=1;i<=no_cav+1;i++){
//         // window.alert(i);
//         if(i==id_armazem2){
//             continue;
//         }

//         for(let j=1;j<=no_sem;j++){
//             addSem(i,j);
//         }
//     }
// }

// //não precisamos de atribuir ids às sementes
// function addSem(cav_id, sem_id2) {
    
//     var sem = document.createElement("div");
//     sem.setAttribute("class","semente");
//     document.getElementById("c"+cav_id).appendChild(sem);

//     //ex: sem_id="sem+1+1"
//     // var sem_id="sem"+cav_id+sem_id2;
//     // sem.setAttribute("id", sem_id);
// }


// function addCav(i,no_cav) {
    
//     var cav = document.createElement("div");
//     var cav2 = document.createElement("div");
//     cav.setAttribute("class","cavidade");
//     cav2.setAttribute("class","cavidade");
//     document.getElementById('up_side').appendChild(cav);
//     document.getElementById('down_side').appendChild(cav2);
//     var id_up="c"+(no_cav+2-i), id_down="c"+i;
//     cav.setAttribute("id", id_up);
//     cav2.setAttribute("id", id_down);
// }


// function addStorage(add_cav,no_cav){
    
//     var id_armazem2=+add_cav+1, id_armazem1=no_cav+2;

//     var a1 = document.createElement("div");
//     var a2 = document.createElement("div");

//     a1.setAttribute("id","c"+id_armazem1); //direita
//     a2.setAttribute("id","c"+id_armazem2); //esquerda

//     a1.setAttribute("class","armazem");
//     a2.setAttribute("class","armazem");

//     document.getElementById("left_space").appendChild(a1);
//     document.getElementById("right_space").appendChild(a2);
//     // console.log(id_armazem1);

//     return id_armazem2;
// }
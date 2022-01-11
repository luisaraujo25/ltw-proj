//BOT - MINIMAX - MINIMIZE THE LOSS
function mybot(){

    const no_cavs = document.getElementById("num_cavidades_op").value;
    var first_id = +no_cavs + 2;

    var options = [], loss = [];

    for(let i=0; i<no_cavs; i++){

        var id_num = +first_id + i;
        var id = "c" + id_num;
        options[i] = document.getElementById(id).childNodes.length;
        // console.log(options[i]);
    }
    loss(options, no_cavs);
}

function loss(options, no_cav){

    const no_cav_total = no_cav*2+2;
    var variation = [];
    for(let i=0;i<no_cav;i++){

        //distribui
        // for(let j=0; j<options[i]; j++){
        //     variation[i] = 

        // }
        
    }
}
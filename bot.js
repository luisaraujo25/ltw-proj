function choose_bot(bot){
    
    const no_cavs = document.getElementById("num_cavidades_op").value;
    var first_id = +no_cavs + 2;
    let value;
    if(bot){
        value = dumbBot(no_cavs,first_id);
    }
    else{
        value = greedyBot(no_cavs,first_id);
    }
    return value
}

function dumbBot(no_cavs,first_id){
    
    const last_id = first_id+no_cavs-1;
    const random_id = Math.random()*(last_id-first_id)+first_id;

    return random_id;
}


//BOT - MINIMAX - MINIMIZE THE LOSS
function greedyBot(no_cavs,first_id){


    // console.log(first_id);

    var max = 0;
    var better_option = first_id;
    
    // console.log("OPTION SEPARATOR ********");

    for(let i=0;i<no_cavs;i++){
        
        cav_id_num = first_id + i;
        no_sem = document.getElementById("c"+cav_id_num).childNodes.length;

        if(!no_sem){
            // console.log("not an option");
            continue;
        }

        // console.log("C"+cav_id_num+": "+no_sem+" SEMENTES");

        var count = after_play(no_sem, no_cavs, first_id, cav_id_num+1);

        if(count>max){
            max = count
            better_option = first_id+i;
        }
    }

    console.log("CAVIDADE ESCOLHIDA: c"+ better_option);

    //retornar a cavidade escolhida
    return (better_option);
}

function after_play(no_sem, no_cavs, first_id, cav_id_num){
    
    const no_cavs_total = no_cavs*2+2;
    // console.log("AFTER PLAY:");
    var count = - no_sem;
    //o indice de aux o id das cavidades e o valor de cada elemento é o numero de sementes com que ficaria
    var aux = [];

    //initializing aux
    for(let i=1;i<=no_cavs_total;i++){
        aux[i]=0;
    }
    //retirar as sementes da cavidade de onde vao ser distribuidas
    aux[cav_id_num-1]-=no_sem;

    var count = 0;

    for(let i = 0; i < no_sem; i++){

        while(cav_id_num>no_cavs_total){
            // console.log("ALTEREI DE: "+cav_id_num);
            cav_id_num-=(no_cavs*2+2);
            // console.log("PARA: "+cav_id_num);
        }
        
        var this_cav = document.getElementById("c"+cav_id_num);

        aux[cav_id_num] += 1;
        // console.log("RESULT C" + cav_id_num + ": " + aux[cav_id_num]);
        cav_id_num += 1;
        // console.log(cav_id_num);
        
    }

    for(let i=1; i<=no_cavs_total; i++){

        var sum = aux[i] + document.getElementById("c"+i).childNodes.length;

        if(myCavs(first_id,no_cavs_total,i)){
            // console.log("CAV"+i+"= "+(document.getElementById("c"+i).childNodes.length+aux[i]));
            count += sum;
        }
    }
    // console.log(count);

    return count;
} 

//bot é uma variável boolean
function myCavs(first_id, no_cavs_total, cav_id){

    var bot=false;
    if(cav_id>=first_id && cav_id<=no_cavs_total){
        bot = true;
    }

    return bot;
}
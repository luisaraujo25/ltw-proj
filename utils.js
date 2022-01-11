//used to deal where the seeds are distributed after reaching the cavity with the highest ID
function turn_around(no_cav_total, cav_ini_id, no_childs){

    var final_cav_id = cav_ini_id + no_childs;

    while(final_cav_id>no_cav_total){
        final_cav_id-=no_cav_total;
    }

    // console.log("c"+final_cav_id);

    return final_cav_id;
}


// function login_space(){
    
//     document.getElementById("login_form").style.display="hide";

// }
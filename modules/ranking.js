const fs = require('fs');


module.exports = async function(){
    let data = fs.readFileSync('./files/rankings.json');
    let answer = [];


    try{
        rankind_data = JSON.parse(data.toString());
    }
    catch (e){
        rankind_data = [];
    }

    if(rankind_data.length === 0 || rankind_data === null){
        answer.status = 400;
        answer.body = {ranking : []}; 
    }
    else{
        rankind_data.sort(function(x,y){return y["victories"]-x["victories"]});
        var list = {ranking : rankind_data.slice(0,10)};
        answer.status = 200;
        answer.body = list;
    }

    return answer;
}
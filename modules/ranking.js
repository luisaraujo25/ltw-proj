const fs = require('fs');


module.exports = async function(){
    let data = fs.readFileSync('./files/rankings.json');
    let answer = [];

    try{
        ranking_data = JSON.parse(data.toString());
    }
    catch (e){
        ranking_data = [];
    }

    if(ranking_data.length === 0 || ranking_data === null){
        answer.status = 400;
        answer.body = {ranking : []}; 
    }
    else{
        ranking_data.sort(function(x,y){return y["victories"]-x["victories"]});
        var list = {ranking : ranking_data.slice(0,10)};
        answer.status = 200;
        answer.body = list;
    }

    return answer;
}
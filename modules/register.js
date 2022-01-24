const fs = require('fs');
const crypto = require('crypto');


module.exports = async function(aux){
    let users = fs.readFileSync('./files/users.json');
    let answer = [];
    let data = JSON.parse(users);


    var hashedPassword = crypto.createHash('md5').update(aux.password.toString()).digest('hex');
    if(JSON.stringify(data) === '{}' || data[aux.nick] === undefined){
    data[aux.nick] = {password: hashedPassword};
        fs.writeFile("./files/users.json",JSON.stringify(data),function(err,data){
        if(err) return console.log(err);
      })
    }
    if(data[aux.nick].password === hashedPassword && data[aux.nick] !== undefined){
        answer.status = 200;
        answer.data = JSON.stringify({});
    }
    else if((data[aux.nick] !== undefined && data[aux.nick].password !== hashedPassword)){
        answer.status = 401;
        answer.data = JSON.stringify({ "error": "User registered with a different password"});
    }
    else{
        answer.status = 404;
    }

    return answer;

}
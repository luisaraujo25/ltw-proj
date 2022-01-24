const crypto = require('crypto');
let waiting_games = [];

module.exports = async function(aux, nick, password) {
    let game_data = JSON.parse(aux);
    let message = [];
    let data = [];

    if(game_data.nick != nick || game_data.password != password){
        message.stat = 401;
        message.msg = {};
        return message;
    }

    console.log(waiting_games);

    if(waiting_games.length == 0){
        try{
            const gameId = crypto
                .createHash('md5')
                .update(game_data.size.toString() + game_data.initial.toString() + (new Date()).toString())
                .digest('hex');
            data.msg = {game : gameId};
        } catch (e){
            message.stat = 500;
            message.msg = {};
            return message;
        }
        waiting_games.push({group: game_data.group, game: data.msg.game});

        message.stat = 200;
        message.msg = data.msg;
        return message;
    }
    else {
        waiting_games.forEach(item => {
            console.log(item, item.game);
            if(item.group == game_data.group){
                message.stat = 200;
                message.msg = {game: item.game};
                console.log(message);
            }
        })

        if(message.stat == 200){
            return message; 
        } 

        if(message.stat != 200){
            try{
                const gameId = crypto
                    .createHash('md5')
                    .update(game_data.size.toString() + game_data.initial.toString() + (new Date()).toString())
                    .digest('hex');
                data.msg = {game : gameId};
            } catch (e){
                message.stat = 500;
                message.msg = {};
                return message;
            }
        }
        message.stat = 200;
        message.msg = data.msg;
        return message;
    }
}
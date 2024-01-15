var HALL_IP = "http://127.0.0.1:9000"
var HALL_CLIENT_PORT = 9001;
var HALL_ROOM_PORT = 9002;
var HALL_CLUBS_PORT = 9004;

var LOCAL_IP = "localhost"
exports.account_server = function () {
    return{
        CLIENT_PORT: 9000,
        HALL_IP :HALL_IP,
        HALL_CLIENT_PORT:HALL_CLIENT_PORT,
        HALL_CLUBS_PORT:HALL_CLUBS_PORT
    }
}

exports.hall_server = function () {
    return{
       
        HALL_IP :HALL_IP,
        CLIENT_PORT:HALL_CLIENT_PORT,
        FOR_ROOM_IP:LOCAL_IP,
        ROOM_PORT:HALL_ROOM_PORT
    }
}

exports.game_server = function () {
    return{
        SERVER_IP:"001",
        HTTP_PORT:9003,
        HTTP_TICK_TIME:5000,
        HALL_IP:LOCAL_IP,
        HALL_PORT:HALL_ROOM_PORT,
        
    }
}

exports.defaultGoldCount = 100;
exports.roomFullPlayerCount = 3;

exports.createRoomConfig = {
    '1': {
        needCostGold: 100,
        bottom: 10,
        rate: 1
    },
    '2': {
        needCostGold: 1000,
        bottom: 100,
        rate: 2
    },
    
};

exports.rob_state = {
    noRob:0,
    rob:1,
}


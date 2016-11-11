var app = require('express')();
var http = require('http').Server(app);

//attaching socket io to our server
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});

//instantiating a socket connection, handling all
//incomming connection from clients
io.on('connection', function(socket){

    //collecting the message
    socket.on('chat message', function(msg){
        //emitting the signal again
        io.emit('chat message', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
